import jwt
import datetime
import api


def encode_auth_token(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=0),
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

def loadRaceDog() :
    fichier = open("./model/BreedDog.txt", "r")
    raceChien = []

    for ligne in fichier :
        raceChien.append(ligne)
    
    return raceChien

