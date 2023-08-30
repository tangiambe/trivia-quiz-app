from flask import Flask, jsonify, request, make_response, render_template, redirect, session
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId
from flask_bcrypt import Bcrypt

import os

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


"""@app.route("/signup", methods=["POST"])
@cross_origin()
def createUser():
   
    json_data = request.json
    print(json_data["username"])
    db.users.insert_one(
        {
        "firstName": json_data["firstName"] ,
        "lastName": json_data["lastName"] ,
        "username": json_data["username"] ,
        "email": json_data["email"] ,
        "password": json_data["password"]
        }
    )
    return jsonify(json_data)

@app.route("/login", methods=["POST"])
@cross_origin()
def getUserByCredentials():
    json_data = request.json
    user = db.users.find_one({"username": json_data["username"], "password": json_data["password"]})
    
    # We have to serialize the MongoDB Object ID into a String so that it can be properly jsonifyed
    user["_id"] = str(user["_id"])
    return jsonify(user)"""

#LOGIN ROUTE
@app.route("/login", methods= ["GET", "POST"])
@cross_origin()
def login(): 
    # app.secret_key = os.urandom(24) 
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
        
        
        # if user and user["password"] == password:
        #     session["username"] = username
        #     pass 
        # if user == None:
        #     print(user, password)
      
        # return jsonify(user)
        
    

#SIGNUP ROUTE 
@app.route("/signup", methods = ["POST"])
@cross_origin()
def signup(): 
    # app.secret_key = os.urandom(24)
    
   
   
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
    #  return redirect("/login/")
    return jsonify(new_user)

#DASHBOARD ROUTE 
# @app.route("/dashboard/", methods=["GET", "POST"])
# def dashboard(): 
#      if "username" in session: 
#          logged_in_username = session["username"]

#          return redirect("/dashboard/")  

#      else: 
#          error = "Please login"
#          return redirect("/login/", error=error)

# ADD QUESTION SET ONE ROUTE
@app.route("/addsetone/", methods=["PUT"])
@cross_origin()
def createQuizOne():
   if request.method == "PUT":
    json_data = request.json
    db.Set_One.insert_one(
        {
        "Question": json_data["Question"] ,
        "Answer": json_data["Answer"] ,
        }
    )
    return jsonify(json_data)

# ADD QUESTION SET TWO ROUTE
@app.route("/addsettwo/", methods=["PUT"])
@cross_origin()
def createQuizTwo():
   if request.method == "PUT":
    json_data = request.json
    db.Set_Two.insert_one(
        {
        "Question": json_data["Question"] ,
        "Answer": json_data["Answer"] ,
        }
    )
    return jsonify(json_data)    

#QUIZ SET ROUTE
@app.route("/quizsets", methods=["GET"])
@cross_origin()
def getAllQuizSets():
    #  collection = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_One.find()]
    #  collectionTwo = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_Two.find()]
    
    quizSets = [quiz for quiz in db.quizzes.find()]
    response = []
    # if quizSets:
        
    for quiz in quizSets:
        quiz["_id"] = str(quiz["_id"])
        response.append(quiz)
        
    return jsonify(response);
    # else:
    #     error = "No quiz sets available"
    #     return jsonify(error);


#QUIZ SET BY ID ROUTE 
@app.route("/quizset/<id>", methods=["GET"])
@cross_origin()
def getQuizSetByID(id): 
    # if db.Set_One["_id"] == id or db.Set_Two["_id"] == id:
    #     setOne = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_One.find()]
    #     setTwo = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_Two.find()]
    #     return jsonify(setOne, setTwo)
    quizset = db.quizzes.find_one({"_id": ObjectId(id)})
    if quizset != None: 
        quizset["_id"] = str(quizset["_id"])
        return jsonify(quizset);
    else:
        error = "Not a valid Quiz Id"
        return jsonify(error)
    
    
    
    
@app.route("/quizset", methods=["POST"])
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
    

if __name__ == "__main__":
    app.run(debug=True)





