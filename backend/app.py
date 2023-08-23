from flask import Flask, jsonify, request, render_template, redirect, session
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)

#INDICATES ABILITY TO CONNECT TO DATABASE, THROWS ERROR OTHERWISE
try:
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/trivia_bank"
    mongo = PyMongo(app)
except:
        print("ERROR- cannot connect to db")

#LOGIN ROUTE
app.route("/", methods= ["GET", "POST"])
def login(): 
    app.secret_key = os.urandom(24) 
    if request.method == "POST": 
        username = request.form.get("username")
        password = request.form.get("password")
    
    user = mongo.db.Users.find_one({"Username": username})

    if user and user["Password"] == password:
        session["username"] = username
        pass 
    error = "Invalid username or password"
    pass

pass

#REGISTER ROUTE 
app.route("/register", methods = ["GET", "POST"])
def register(): 
    app.secret_key = os.urandom(24)
    if request.method == "POST": 
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")

        user_exists = mongo.db.Users.find_one({"Username": username})


