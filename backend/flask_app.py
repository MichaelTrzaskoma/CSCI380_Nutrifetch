from flask import Flask
from flask import request, jsonify

# import the things that Michael has coded
from Nutrifetch import *

app = Flask(__name__)
app.config["DEBUG"] = True

allergy_profile = {
    'Email': "",
    'Allergy': [],
}

profileInput = {}


@app.route('/api/v1/CSCI380/profileInput', methods=['POST'])
def assignProfile():
    # post user allergy profile to the server
    # INPUT: (inside request header) user email and allergy item(s) <-- array
    # OUTPUT: json format allergy_profile && code 202
    data = request.json
    global allergy_profile

    response = ""

    if data['email'] != "":
        email = data['email']
        first_name = data['fname']
        last_name = data['lname']
        gender = data['gender']
        age = data['age']
        weight = data['weight']
        allergy_profile = data['allergens']

        profileInput[email] = (first_name, last_name, gender, age, weight,
                               allergy_profile)

        userProfile(email,
                    first_name,
                    last_name,
                    gender,
                    age,
                    weight,
                    userallergens=allergy_profile)
        # set the info to FireStore
        response = jsonify("Data captured!")
        response.status_code = 202
    else:
        response = jsonify("An error occured!")
        response.status_code = 500
    return response


@app.route('/api/v1/CSCI380/getUPCinfo', methods=['GET'])
def getUPCinfo():
    # get the nutriction info from the server
    # INPUT: UPC code and user email
    # OUTPUT: food nutrition info and food allergy status
    response = ""

    # check if the upc and email is in the URL
    if 'upc' in request.args and 'email' in request.args:
        upc = request.args['upc']
        email = request.args['email']

        if upcCheck(upc):
            nutrition = upcNutrition(upc)
            nutrition.append(allergyCheck(upc, email))
            response = jsonify(nutrition)
            # response.allery = allergyCheck(upc, email)
            response.status_code = 202
        else:
            response = "product not found"
            response = jsonify(response)
            response.status_code = 404

    else:
        response = jsonify("Error code: AX002")
        response.status_code = 500

    return response


# =========================== TEST ===========================
# REST API test sample

# Create some test data for our catalog in the form of a list of dictionaries.
books = [{
    'id': 0,
    'title': 'A Fire Upon the Deep',
    'author': 'Vernor Vinge',
    'first_sentence': 'The coldsleep itself was dreamless.',
    'year_published': '1992'
}, {
    'id': 1,
    'title': 'The Ones Who Walk Away From Omelas',
    'author': 'Ursula K. Le Guin',
    'first_sentence':
    'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
    'published': '1973'
}, {
    'id': 2,
    'title': 'Dhalgren',
    'author': 'Samuel R. Delany',
    'first_sentence': 'to wound the autumnal city.',
    'published': '1975'
}]

userAcc = {
    'signedIn': False,
    'full_name': "",
    'last_name': "",
    'first_name': "",
    'email': "",
    'photoUrl': "",
}


@app.route('/api/v1/csci426/test', methods=['POST'])
def assignUsrAcc():
    global userAcc
    data = request.json
    userAcc = data
    return jsonify(userAcc)


@app.route('/', methods=['GET'])
def home():
    return '''
        <h1>Distant Reading Archive</h1>
        <p>A prototype API for distant reading of science fiction novels.</p>
        '''


# A route to return all of the available entries in our catalog.
@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    response = jsonify(books)
    response.status_code = 202
    return response


@app.route('/api/v1/resources/books', methods=['GET'])
def api_bookID():
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        response = "Error: No id field provided. Please specify an id."
        response.statue_code = 204
        return response

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for book in books:
        if book['id'] == id:
            results.append(book)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    response = jsonify(results)
    response.status_code = 202
    return response


if __name__ == '__main__':
    app.run()
