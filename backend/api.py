from flask import Flask, jsonify, request, abort
import database
import model
import base64

app = Flask(__name__)

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

    return jsonify({'images' : result}), 201

# Post d'une image dans la base de donnée
@app.route('/api/image', methods=['POST'])
def insert_image():
    if not request.json or not 'img' in request.json or not 'email' in request.json :
        abort(400)

    #Decode image
    image_base64 = request.json['img']
    image_base64_utf8 = image_base64.encode("utf-8")
    image_64_decode = base64.decodestring(image_base64_utf8)
    image_result = open('./img_temp.jpg', 'wb')
    image_result.write(image_64_decode)

    espece = model.get_espece('./img_temp.jpg')
    item = database.storeImagePet(image_base64_utf8, espece, request.json['email'])

    return jsonify({'item' : item}), 201

# Post d'une image d'un animal perdu
@app.route('/api/perdu', methods=['POST'])
def get_perdu():

    if not request.json or not 'img' in request.json :
        abort(400)

    image_base64 = request.json['img']
    image_base64 = image_base64.encode("utf-8")

    image_64_decode = base64.decodestring(image_base64)
    image_result = open('./img_temp.jpg', 'wb')
    image_result.write(image_64_decode)

    espece = model.get_espece('./img_temp.jpg')
    result = database.getImage(espece)

    return jsonify({'image' : result}), 201
