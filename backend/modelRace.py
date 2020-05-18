import numpy as np
from keras.engine.saving import load_model
from tensorflow.keras.preprocessing import image

import utils


#dog_names = [item[20:-1] for item in sorted(glob("./model/train/*/"))]


def extract_Resnet50(tensor):
	from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
	return ResNet50(weights='imagenet', include_top=False,pooling="avg").predict(preprocess_input(tensor))

### TODO: Preprocessing
def path_to_tensor(img_path):
    # loads RGB image as PIL.Image.Image type
    img = image.load_img(img_path, target_size=(224, 224))
    # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
    x = image.img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and return 4D tensor
    return np.expand_dims(x, axis=0)

my_model=load_model('./model/dog_breed_model.h5')
### and returns the dog breed that is predicted by the model.
def dog_breed(img_path):
    # extract bottleneck features
    bottleneck_feature = extract_Resnet50(path_to_tensor(img_path))
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    bottleneck_feature = np.expand_dims(bottleneck_feature, axis=0)
    # obtain predicted vector
    predicted_vector = my_model.predict(bottleneck_feature)
    # return dog breed that is predicted by the model
    dog_names = utils.loadRaceDog()
    return dog_names[np.argmax(predicted_vector)]


### Feel free to use as many code cells as needed.
def my_dog_breed_detector(img_path):
    breed = dog_breed(img_path)
    return breed

