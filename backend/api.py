from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import database
import model
import modelRace
import base64
import json
import utils
import os

app = Flask(__name__)
# Pour hash le password
bcrypt = Bcrypt(app)
# Pour que le front puisse utiliser l'API
cors = CORS(app)

# Conf environnement
app_settings = os.getenv(
    'APP_SETTINGS',
    'config.DevelopmentConfig'
)
app.config.from_object(app_settings)


# Retourne tout les utilisateurs inscrits
@app.route('/api/users', methods=['GET'])
def get_users():
    database.getUsers()
    result = database.resultsExportUsers
    return jsonify({'item': result}), 201


# Retourne toutes les images de la BDD
@app.route('/api/images', methods=['GET'])
def get_images():

    # Vérification de l'autorisation
    get_status()

    result = database.getAll()

    return jsonify({'images': result}), 201


# Retourne toutes les images de la BDD pour un utilisateur donné
@app.route('/api/images/<int:user_id>', methods=['GET'])
def get_images_for_user(user_id):

    # Vérification de l'autorisation
    get_status()

    result = database.getAllForUser(user_id)

    return jsonify({'images': result}), 201


# Enregistrement d'un animal trouvé dans la base de donnée
@app.route('/api/image', methods=['POST'])
def insert_image():
    if not request.json or not 'images' in request.json or not 'email' in request.json:
        abort(400)

    # Vérification de l'autorisation
    get_status()

    CATEGORIES = {'chat': 0, 'poule2': 0, 'chien': 0, 'cheval': 0, 'lapin': 0}
    img_base64 = []
    for img in request.json['images']:
        # Decode image
        # image_base64 = request.json['img']
        image_base64 = img
        image_base64_utf8 = image_base64.encode("utf-8")
        img_base64.append(image_base64_utf8)
        image_64_decode = base64.decodestring(image_base64_utf8)
        image_result = open('./img_temp.jpg', 'wb')
        image_result.write(image_64_decode)

        espece = model.get_espece('./img_temp.jpg')
        CATEGORIES[espece] = CATEGORIES[espece] + 1

    espece = max(CATEGORIES, key=CATEGORIES.get)

    if espece == "chien":
        race = modelRace.my_dog_breed_detector('./img_temp.jpg')
        if 'race' in request.json:
            request.json['race'] = race
        else:
            request.json.setdefault('race', race)

    # item = database.storeImagePet(image_base64_utf8, espece, request.json)
    item = database.storeMultiImagePet(img_base64, espece, request.json)
    return jsonify({'item': item}), 201


# Post d'une image d'un animal perdu
@app.route('/api/perdu', methods=['POST'])
def get_perdu():
    if not request.json or not 'images' in request.json:
        abort(400)

    # Vérification de l'autorisation
    get_status()

    image_base64 = request.json['images'][0]
    image_base64 = image_base64.encode("utf-8")

    image_64_decode = base64.decodestring(image_base64)
    image_result = open('./img_temp.jpg', 'wb')
    image_result.write(image_64_decode)

    espece = model.get_espece('./img_temp.jpg')
    result = database.getImage(espece)

    return jsonify({'images': result}), 201


# RGPD suppression photos animaux
@app.route('/api/image/<int:user_id>', methods=['DELETE'])
def delete_picture(user_id):
    # Vérification de l'autorisation
    get_status()

    result = database.deleteAll(user_id)

    return jsonify({'deletedImagesCount': result}), 201


# Création d'un compte utilisateur
@app.route('/api/auth/register', methods=['POST'])
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
    auth_token = utils.encode_auth_token(result['id'])
    if auth_token:
        response = {
            'status': 'success',
            'message': 'Connexion réussie.',
            'auth_token': auth_token.decode()
        }
        return make_response(jsonify(response)), 200
    else:
        response = {
            'status': 'fail',
            'message': 'L\'utilisateur n\'existe pas.'
        }
    return make_response(jsonify(response)), 404


# Vérification de la validité du token fourni
@app.route('/api/auth/status', methods=['GET'])
def get_status():
    # get the auth token
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            auth_token = auth_header.split(" ")[1]
        except IndexError:
            responseObject = {
                'status': 'fail',
                'message': 'Bearer token malformed.'
            }
            return make_response(jsonify(responseObject)), 401
    else:
        auth_token = ''
    if auth_token:
        resp = utils.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            user = database.retrieveUserById(resp)
            responseObject = {
                'status': 'success',
                'data': {
                    'user_id': user['id'],
                    'email': user['email'],
                    'name': user['name'],
                    'lastname': user['lastname'],
                    'created_at': user['created_at']
                }
            }
            return make_response(jsonify(responseObject)), 200
        responseObject = {
            'status': 'fail',
            'message': resp
        }
        return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 401


# Suppression de compte
@app.route('/api/auth/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):

    # Vérification de l'autorisation
    get_status()

    # Suppression de ses photos
    database.deleteAll(user_id)

    # Suppression de son compte
    result = database.deleteUserById(user_id)

    # Renvoie true si un utilisateur a bien été supprimé
    return jsonify({'success': result == 1}), 201
