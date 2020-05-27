import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

import utils


def extract_Resnet50(tensor):
    from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
    return ResNet50(weights='imagenet', include_top=False, pooling="avg").predict(preprocess_input(tensor))


### TODO: Preprocessing
def path_to_tensor(img_path, size):
    # loads RGB image as PIL.Image.Image type
    print(size)
    img = image.load_img(img_path, target_size=(size, size))
    # convert PIL.Image.Image type to 3D tensor with shape (size, size, 3)
    x = image.img_to_array(img)
    print(img)
    print(x)
    # convert 3D tensor to 4D tensor with shape (1, size, size, 3) and return 4D tensor
    return np.expand_dims(x, axis=0)

my_model=load_model('./model/dog_breed_model.h5')
### and returns the dog breed that is predicted by the model.
def dog_breed(img_path):
    # extract bottleneck features
    bottleneck_feature = extract_Resnet50(path_to_tensor(img_path, 224))
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    # obtain predicted vector
    predicted_vector = my_model.predict(bottleneck_feature)
    # return dog breed that is predicted by the model
    dog_names = utils.loadRaceDog()
    return dog_names[np.argmax(predicted_vector)]


def my_dog_breed_detector(img_path):
    breed = dog_breed(img_path)
    return breed


def my_cat_breed_detector(img_path):
    breed = cat_breed(img_path)
    return breed


def extract_Xception(tensor):
    from tensorflow.keras.applications.xception import Xception, preprocess_input
    return Xception(weights='imagenet', include_top=True).predict(preprocess_input(tensor))


my_model = load_model('./model/Xception_model_cat.h5')
### and returns the cat breed that is predicted by the model.
def cat_breed(img_path):
    # extract bottleneck features
    bottleneck_feature = extract_Xception(path_to_tensor(img_path, 299))
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    # obtain predicted vector
    predicted_vector = my_model.predict(bottleneck_feature)
    # return dog breed that is predicted by the model
    dog_names = utils.loadRaceCat()
    return dog_names[np.argmax(predicted_vector)]
