import urllib ,json
from urllib.request import urlopen

#upc = '044000032029'
#upc = '044000000615'
upc = '688267000263'
#Dictionary for daily values, current numbers as place holders 
dailyVal = {
    'fat' : 1,
    'saturated-fat' : 2,
    'cholesterol' : 3,
    'sodium': 4,
    'carbohydrates' : 5,
    'fiber' : 6,
    'vitamin-d' : 7,
    'calcium' : 8,
    'iron' : 9,
    'potassium' : 10, 
}

def upcCheck(upc):
    url = "https://world.openfoodfacts.org/api/v0/produc/" + upc + ".json"
    with urlopen(url) as urla:
        s = urla.read()
    check = json.loads(s)
    if check['status'] == 0: 
        return False 
    if check['status'] == 1:
        return True

def upcNutrition(upc):
    url = "https://world.openfoodfacts.org/api/v0/produc/" + upc + ".json"
    with urlopen(url) as urla:
        s = urla.read()
    productFile = json.loads(s)

    productInformation = []

    genProductDict = productFile['product']


    productInformation.append(genProductDict['product_name'])
    productInformation.append(genProductDict['ingredients_text'])
    productInformation.append(genProductDict['allergens_from_ingredients'])

    nutriRef = genProductDict['nutriments']

    productInformation.append(nutriRef['energy-kcal'])

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


    noDaily = ['protiens', 
                'sugars', 
                'trans-fat']
    

    for i in range(len(nutritionFields)):
        field = nutritionFields[i]
        fieldStats = []
        fieldStats.append(field)
        if field in nutriRef:
            num = nutriRef[field + '_serving'] 
            unit = nutriRef[field + '_unit']
            value = str(num) + str(unit)
            fieldStats.append(value)
            if field in noDaily:
                percent = ''
            else:
                percent = (float(num)/dailyVal[field])*100
                percent = str(percent) + '%'
            fieldStats.append(percent)
            productInformation.append(fieldStats)

        else:
            fieldStats.append('')
            fieldStats.append('')
            productInformation.append(fieldStats)


    return productInformation

print(upcNutrition(upc))