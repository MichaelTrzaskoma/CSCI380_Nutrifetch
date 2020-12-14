#Firestore stuff
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#Upc read 
import urllib ,json
from urllib.request import urlopen

upc = '4005500049623'
# upc = '044000032029'
# upc = '044000000615'
# upc = '688267000263'

from datetime import date

import re

#Firestore initialization
# cred = credentials.Certificate("nutrifetchtest-firebase-adminsdk-ec3t6-e6a21b3a6f.json")
cred = credentials.Certificate("/home/hui/Desktop/google-service-account_CSCI380.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
user_ref =db.collection("Users")


#Dictionary for daily values, current numbers as place holders, not actual values
dailyVal = {
    'fat' : 78,
    'saturated-fat' : 20,
    'cholesterol' : 300,
    'sodium': 2300,
    'carbohydrates' : 275,
    'fiber' : 28,
    'vitamin-d' : 20,
    'calcium' : 1300,
    'iron' : 18,
    'potassium' : 4700, 
}


#Checks if the upc exists or not
#input : upc code
#output : boolean
def upcCheck(upc):
    url = "https://world.openfoodfacts.org/api/v0/produc/" + upc + ".json"
    with urlopen(url) as urla:
        s = urla.read()
    check = json.loads(s)
    if check['status'] == 0: 
        return False 
    if check['status'] == 1:
        return True
    

def trimmer(item):
    # remove special characters from the ingrdients txt
    # INPUT: ingrdient
    # OUPUT: clean ingrdient
    return re.sub('\W+','', item)

    
#Takes the upc code and returns array of information 
#Input UPC code
#Output returns list with each index as:
# 0 : product name (as a string)
# 1 : ingredients (as a string)
# 2 : allergens (as a string)
# 3 : calories (as a string)
#
# Nutrient values as arrays below[Nutrient name, 
#                                 nutrient value with unit(if product contains it, emptry string if not), 
#                                 nutrient daily value percent(if nutrient exists and  has daily value, empty string if not)]
# 4 : 'fat' 
# 5 : 'staturated-fat' 
# 6 : 'trans-fat'
# 7 : 'cholesterol' 
# 8 : 'sodium' 
# 9 : 'carbohydrates' 
# 10 : 'fiber' 
# 11 : 'sugars'
# 12 : 'protiens' 
# 13 : 'vitamin-d' 
# 14 : 'calcium' 
# 15 : 'iron' 
# 16 : 'potassium'
def upcNutrition(upc):
    #Loads the api json file
    url = "https://world.openfoodfacts.org/api/v0/produc/" + upc + ".json"
    with urlopen(url) as urla:
        s = urla.read()
    productFile = json.loads(s)
    
    #Array that contains the returned product information 
    productInformation = []
    
    #Dictionary ref for general information
    genProductDict = productFile['product']

    #Name, ingredients, allergends
    productInformation.append(genProductDict['product_name'])
    
    ingredientsList = []
    for i in range(len(genProductDict['ingredients_original_tags'])):
        if(hasNumbers(genProductDict['ingredients_original_tags'][i])) == False:
            ingredientsList.append(genProductDict['ingredients_original_tags'][i][3:])
    productInformation.append(ingredientsList)

    allergenList = []
    for i in range(len(genProductDict['allergens_tags'])):
        if(hasNumbers(genProductDict['allergens_tags'][i])) == False:
            allergenList.append(genProductDict['allergens_tags'][i][3:])
    productInformation.append(allergenList)

    
    #Dictionary ref for nutrition info of product
    nutriRef = genProductDict['nutriments']
    
    #Calories
    productInformation.append(nutriRef['energy-kcal_serving'])

    #Current nutrients list
    nutritionFields = ['fat', 
                        'staturated-fat', 
                        'trans-fat', 
                        'cholesterol', 
                        'sodium', 
                        'carbohydrates', 
                        'fiber', 
                        'sugars', 
                        'protiens', 
                        'vitamin-d', 
                        'calcium', 
                        'iron', 
                        'potassium',]

    #Nutrients without daily values 
    noDaily = ['protiens', 
                'sugars', 
                'trans-fat']
    
    #Loops through nutrient list, appends a list of nutrient : ['Name', 'Val', 'Percent']
    #If nutrient doesn't exist, still will append Name with emptry string for Val and Percent
    for i in range(len(nutritionFields)):
        field = nutritionFields[i]
        fieldStats = []
        fieldStats.append(field)
        endStr = '_serving'
        
        #Check if there's a per serving
        if field+endStr not in nutriRef:
            endStr = ''
            
        #Check if field exists in json   
        if field in nutriRef:
            num = nutriRef[field + endStr] 
            unit = nutriRef[field + '_unit']
            
            #Modify to represent in terms of mg
            if unit == 'mg':
                num *= 1000
            value = str(round(num,2)) + str(unit)
            fieldStats.append(value)
            
            #Check for daily value
            if field in noDaily:
                percent = ''
            else:
                percent = round(((float(num)/dailyVal[field])*100),2)
                percent = str(percent) + '%'
            fieldStats.append(percent)
            productInformation.append(fieldStats)
            
        else:
            fieldStats.append('')
            fieldStats.append('')
            productInformation.append(fieldStats)


    return productInformation


def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

#fields for profile, email, name? fire and last?, age, sex, weight
def userProfile(userEmail, nameF, nameL, sex, age, weight, userallergens = []):
    [x.lower() for x in userallergens]
    user_ref.document(userEmail).set({
        u'First Name' : nameF,
        u'Last Name' : nameL,
        u'Sex' : sex,
        u'Age' : age,
        u'Weight' : weight,
        u'Allergies' : userallergens 

    })

#Add a product to a history collection, need to logisitc food id, upc, date, expirey date, 
def addProduct(userEmail, upc, productName, calories):
    today = str(date.today().strftime('%m/%d/%Y'))
    user_ref.document(userEmail).collection('History').document(upc).set({
        u'Scan Date' : today,
        u'Product' : productName,
        u'Upc' : upc,
        u'Calories' : calories,
        u'Expire Date' : ''

    })
 

#Checks to see if the user is allergic, or if user has profile yet
#Input, product upc, email
#Output, one of the 3 strings vals 
# 2 = user profile doesnt exist
# 1 = allergen exists in product
# 0 = allergen doesn't exist in product
def allergyCheck(upc, email):
    userProfile = user_ref.document(email).get()
    if userProfile.exists == False:
        return '2'
    nutritionInfo = upcNutrition(upc)
    allergensStr = nutritionInfo[2]
    # we can't use split() in a list
    # allergensList = allergensStr.split(', ')
    userAllergies = userProfile.to_dict().get('Allergies')
    for i in range(len(userAllergies)):
        if userAllergies[i] in allergensStr:
            return '1'
    return '0'
#Testing firestore inputs 
#productInfo = upcNutrition(upc)
#userProfile('mtrzask', 'Mike', 'Trz', 'male', 21, '150lbs')
#addProduct('mtrzask', upc, productInfo[1], productInfo[3])
# print(allergyCheck(upc, "hchen60@nyit.edu"))



#Test of upcNutrition, should return string of information 
# print(upcNutrition(upc))

#Test of upcNutrition, should return string of information
# print(upcNutrition(upc))


# test output
for item in upcNutrition(upc):
    print("%s \n==" % item)