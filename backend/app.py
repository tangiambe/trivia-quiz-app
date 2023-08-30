from flask import Flask, jsonify, request, render_template, redirect, session
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
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
# HOME ROUTE 
@app.route("/")
def home():
    return render_template("home.html")

#LOGIN ROUTE
@app.route("/login/", methods= ["GET", "POST"])
def login(): 
     app.secret_key = os.urandom(24) 
     if request.method == "POST": 
         username = request.form.get("username")
         password = request.form.get("password")
    
         user = db.Users.find_one({"Username": username})

         if user and user["Password"] == password:
             session["username"] = username
             pass 
         error = "Invalid username or password"
         return render_template("login.html", error=error)

#     return render_template("login.html")

#SIGNUP ROUTE 
@app.route("/signup/", methods = ["GET", "POST"])
def signup(): 
    app.secret_key = os.urandom(24)
    if request.method == "POST": 
         first_name = request.form.get("first_name")
         last_name = request.form.get("last_name")
         username = request.form.get("username")
         email = request.form.get("email")
         password = request.form.get("password")

         user_exists = db.Users.find_one({"Username": username})
         email_exists = db.Users.find_one({"Email": email})

         if user_exists: 
             error = "Username already taken. Please choose another username"
             return redirect("/signup/", error=error)
         elif email_exists: 
             error = "Email is already in use. Please choose another email"
             return redirect("/signup/", error=error) 
        
         #Inserts the user into the database 
         new_user = (
            { 
            "FirstName": [first_name], 
             "LastName": [last_name], 
             "Username": [username], 
             "Email": [email], 
             "Password": [password]
            }
         )
         db.Users.insert_one(new_user)
         return redirect("/login/")
    
    return jsonify(new_user)

#DASHBOARD ROUTE 
@app.route("/dashboard/", methods=["GET", "POST"])
def dashboard(): 
     if "username" in session: 
         logged_in_username = session["username"]

         return redirect("/dashboard/")  

     else: 
         error = "Please login"
         return redirect("/login/", error=error)

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
@app.route("/allquizsets/", methods=["GET"])
def getAllQuizSets():
     collection = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_One.find()]
     collectionTwo = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_Two.find()]
     return jsonify(collection, collectionTwo)


#QUIZ SET BY ID ROUTE 
@app.route("/quizsetsbyid/<id>/", methods=["GET", "POST"])
def getQuizSetByID(id): 
    if db.Set_One["_id"] == id or db.Set_Two["_id"] == id:
        setOne = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_One.find()]
        setTwo = [{"Question": doc["Question"], "Answer": doc["Answer"]} for doc in db.Set_Two.find()]
        return jsonify(setOne, setTwo)
    else:
        error = "Not a valid Quiz Id"
        return redirect( "/dashboard/", error=error)

if __name__ == "__main__":
    app.run(debug=True)





