from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import database
import model
import base64

app = Flask(__name__)
# Pour hash le password
bcrypt = Bcrypt(app)
# Pour que le front puisse utiliser l'API
cors = CORS(app)


# Retourne tout les utilisateurs inscrits
@app.route('/api/users', methods=['GET'])
def get_users():
    database.getUsers()
    result = database.resultsExportUsers
    return jsonify({'item': result}), 201


# Retourne toutes les images de la BDD
@app.route('/api/images', methods=['GET'])
def get_images():
    result = database.getAll()

    return jsonify({'images': result}), 201


# Post d'une image dans la base de donnée
@app.route('/api/image', methods=['POST'])
def insert_image():
    if not request.json or not 'img' in request.json or not 'email' in request.json:
        abort(400)

    # Decode image
    image_base64 = request.json['img']
    image_base64_utf8 = image_base64.encode("utf-8")
    image_64_decode = base64.decodestring(image_base64_utf8)
    image_result = open('./img_temp.jpg', 'wb')
    image_result.write(image_64_decode)

    espece = model.get_espece('./img_temp.jpg')
    item = database.storeImagePet(image_base64_utf8, espece, request.json['email'])

    return jsonify({'item': item}), 201


# Post d'une image d'un animal perdu
@app.route('/api/perdu', methods=['POST'])
def get_perdu():
    if not request.json or not 'img' in request.json:
        abort(400)

    image_base64 = request.json['img']
    image_base64 = image_base64.encode("utf-8")

    image_64_decode = base64.decodestring(image_base64)
    image_result = open('./img_temp.jpg', 'wb')
    image_result.write(image_64_decode)

    espece = model.get_espece('./img_temp.jpg')
    result = database.getImage(espece)

    return jsonify({'image': result}), 201


# Création d'un compte utilisateur
@app.route('/api/auth/signin', methods=['POST'])
def create_user():
    if not request.json or not 'email' in request.json:
        abort(400)

    name = request.json['name']
    lastname = request.json['lastname']
    email = request.json['email']
    password = request.json['password']

    result = database.createUser(name, lastname, email, password)
    return jsonify({'item': result}), 201


# Connexion
@app.route('/api/auth/login', methods=['POST'])
def log_user():
    if not request.json or not 'email' or not 'password' in request.json:
        abort(400)

    email = request.json['email']
    password = request.json['password']

    result = database.logIn(email, password)
    return jsonify({'item': result}), 200
