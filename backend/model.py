import cv2
import tensorflow as tf
import numpy as np
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model


global resultsExportEtudiants
resultsExportEtudiants = []
global CATEGORIES
CATEGORIES = ['chat', 'poule', 'chien', 'cheval', 'lapin']

# load and prepare the image
def load_image(filename):
    # load the image
    img = load_img(filename, target_size=(224, 224))
    # convert to array
    img = img_to_array(img)
    # reshape into a single sample with 3 channels
    img = img.reshape(1, 224, 224, 3)
    # center pixel data
    img = img.astype('float32')
    return img

 

# load an image and predict the espece
def get_espece(file):
    # load the image
    img = load_image(file)
    # load model
    model = load_model('./model/vgg19_5species75train25')
    # predict the class
    result = model.predict(img)

    indice = np.where(result[0] == np.amax(result[0]))

    espece =  CATEGORIES[indice[0][0]]
    return espece


