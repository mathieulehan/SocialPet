import jwt
import datetime
import api
from models import load_model_cat, load_model_dog, load_model_horse

def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=365, seconds=0),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            api.app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    """
    Valide le token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, api.app.config.get('SECRET_KEY'))
        # voir si besoin d'une blacklist
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def loadRaceDog():
    fichier = open("./models/BreedDog.txt", "r")
    raceChien = []

    for ligne in fichier:
        raceChien.append(ligne)

    return raceChien


def loadRaceCat():
    fichier = open("./models/BreedCat.txt", "r")
    raceCat = []

    for ligne in fichier:
        raceCat.append(ligne)

    return raceCat


def loadRaceHorse():
    fichier = open("./models/BreedHorse.txt", "r")
    raceHorse = []

    for ligne in fichier:
        raceHorse.append(ligne)

    return raceHorse


def getRaceOfSpecie(specie):
    if specie == "chien":
        return load_model_dog.my_dog_breed_detector('./img_temp.jpg')
    if specie == "chat2":
        return load_model_cat.getCatBreed('./img_temp.jpg')
    if specie == "cheval":
        return load_model_horse.getHorseBreed('./img_temp.jpg')
    if specie == "poule2":
        return "defaultChickenRace"
