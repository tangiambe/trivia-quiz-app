from flask import Flask, jsonify, request, render_template, redirect, session
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

import os

app = Flask(__name__)

#INDICATES ABILITY TO CONNECT TO DATABASE, THROWS ERROR OTHERWISE
try:
    app = Flask(__name__)
    # mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/trivia_bank")
    app.config["MONGO_URI"] = "mongodb://localhost:27017/trivia_bank"
    mongo = PyMongo(app)
    db = mongo.db
except:
        print("ERROR- cannot connect to db")


@app.route("/signup", methods=["POST"])
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
def getUserByCredentials():
    json_data = request.json
    user = db.users.find_one({"username": json_data["username"], "password": json_data["password"]})
    
    # We have to serialize the MongoDB Object ID into a String so that it can be properly jsonifyed
    user["_id"] = str(user["_id"])
    return jsonify(user)
# # HOME ROUTE 
# @app.route("/")
# def home():
#     return render_template("home.html")

# #LOGIN ROUTE
# @app.route("/login/", methods= ["GET", "POST"])
# def login(): 
#     app.secret_key = os.urandom(24) 
#     if request.method == "POST": 
#         username = request.form.get("username")
#         password = request.form.get("password")
    
#         user = mongo.db.Users.find_one({"Username": username})

#         if user and user["Password"] == password:
#             session["username"] = username
#             pass 
#         error = "Invalid username or password"
#         return render_template("login.html", error=error)

#     return render_template("login.html")

# #SIGNUP ROUTE 
# @app.route("/signup/", methods = ["GET", "POST"])
# def signup(): 
#     app.secret_key = os.urandom(24)
#     if request.method == "POST": 
#         first_name = request.form.get("first_name")
#         last_name = request.form.get("last_name")
#         username = request.form.get("username")
#         email = request.form.get("email")
#         password = request.form.get("password")

#         user_exists = mongo.db.Users.find_one({"Username": username})
#         email_exists = mongo.db.Users.find_one({"Email": email})

#         if user_exists: 
#             error = "Username already taken. Please choose another username"
#             return render_template("register.html", error=error)
#         elif email_exists: 
#             error = "Email is already in use. Please choose another email"
#             return render_template("register.html", error=error)
        
#         #Inserts the user into the database 
#         new_user = {
#             "FirstName": first_name, 
#             "LastName": last_name, 
#             "Username": username, 
#             "Email": email, 
#             "Password": password
#         }
#         mongo.db.Users.insert_one(new_user)
#         return redirect("")
    
#     return render_template("signup.html")

# #DASHBOARD ROUTE 
# @app.route("/dashboard/", methods=["GET", "POST"])
# def dashboard(): 
#     if "username" in session: 
#         logged_in_username = session["username"]

#         user_data = mongo.db.Users.find_one({"Username": logged_in_username})
#         trivia_cards = list(mongo.db.get_collectionNames())

#         #if user_data you want to be able to choose a set of cards 
#     else: 
#         error = "Please login before choosing a triva set"
#         return jsonify(trivia_cards);

# #QUIZ SET ROUTE
# @app.route("/allquizsets/", methods=["GET"])
# def getAllQuizSets():
#     collection = list(mongo.db.get_collection())
#     return jsonify(collection);

# #QUIZ SET BY ID ROUTE 
# @app.route("/quizsets/<_id>/", methods=["GET", "POST"])
# def getQuizSetByID(): 
#     pass

if __name__ == "__main__":
    app.run(debug=True)





