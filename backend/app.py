from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
import json

app = Flask(__name__)

#INDICATES ABILITY TO CONNECT TO DATABASE, THROWS ERROR OTHERWISE
try:
    app = Flask(__name__)
    cors = CORS(app)
    # mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/trivia_bank")
    app.config["MONGO_URI"] = "mongodb://localhost:27017/trivia_bank"
    app.config["CORS_HEADERS"] = "Content-Type"
    mongo = PyMongo(app)
    db = mongo.db
except:
        print("ERROR- cannot connect to db")

#LOGIN ROUTE
@app.route("/login", methods= ["GET", "POST"])
@cross_origin()
def login():  
    if request.method == "POST": 
        username = request.json.get("username")
        password = request.json.get("password")

        try:
            user = db.users.find_one({"username": username, "password": password})
            user["_id"] = str(user["_id"])
            return jsonify(user)
            
        except Exception as e :
            error = "Invalid username or password"
            raise ValueError(error)

#REGISTER ROUTE 
@app.route("/register", methods = ["POST"])
@cross_origin()
def register(): 
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")

    user_exists = db.users.find_one({"username": username})
    email_exists = db.users.find_one({"email": email})

    if user_exists: 
        error = "Username already taken. Please choose another username"
        return jsonify(error)
    elif email_exists: 
        error = "Email is already in use. Please choose another email"
        return jsonify(error)

    #Inserts the user into the database 
    new_user = (
    { 
        "firstName": first_name, 
        "lastName": last_name, 
        "username": username, 
        "email": email, 
        "password": password
    }
    )
    db.users.insert_one(new_user)
    return jsonify(new_user)
            
#GET ALL QUIZ SETS ROUTE
@app.route("/quizsets", methods=["GET"])
@cross_origin()
def getAllQuizSets():
    quizSets = [quiz for quiz in db.quizzes.find()]
    response = []
    if quizSets:
        
        for quiz in quizSets:
            quiz["_id"] = str(quiz["_id"])
            response.append(quiz)
        
        return jsonify(response)
    else:
        error = "No quiz sets available"
        return jsonify(error)


#QUIZ SET BY ID ROUTE 
@app.route("/quizset/<id>", methods=["GET"])
@cross_origin()
def getQuizSetByID(id): 
    quizset = db.quizzes.find_one({"_id": ObjectId(id)})
    if quizset != None: 
        quizset["_id"] = str(quizset["_id"])
        return jsonify(quizset)
    else:
        error = "Not a valid Quiz Id"
        return jsonify(error)  

#CREATE QUIZ SET ROUTE    
@app.route("/createquizset", methods=["POST"])
@cross_origin()
def createQuizSet():
    json_data = request.json
    print(json_data["questions"])
    db.quizzes.insert_one(
        {
        "title": json_data["title"] ,
        "questions": json_data["questions"]
        }
    )
    return jsonify(json_data)

#POPULATE ROUTE     
@app.route("/populate", methods=["GET"])
@cross_origin()
def populateDb():
    
    quizFile = open("quizSet.json")
    quizCollection = json.load(quizFile)
    
    try:
        db.quizzes.insert_many(quizCollection)
        message = jsonify({"message": "populated"})
        response = make_response(message, 201)
        return response
    except Exception as e:
        raise ValueError(e)

if __name__ == "__main__":
    app.run(debug=True)





