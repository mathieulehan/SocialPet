from glob import glob

import cv2
import numpy as np
# loads model if not loaded already
from tensorflow.keras import Sequential, regularizers
from keras.engine.saving import load_model
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.applications import xception
from keras_preprocessing.image import load_img, img_to_array
import matplotlib.pyplot as plt
# from model_augment_cat import load_ground_up_model
import matplotlib.image as mpimg
import utils


def load_ground_up_model(weights=None):
    '''
    This function loads my custom model trained on augmented input data
    The model has a base of bottom-only xception, plus a custom dense network output
    Inputs:
        weights (String): filepath and filename of last .hdf5 file checkpoint. Default None
    Returns:
        ground_up_model (keras.Sequential): A model for classifying dog breeds
    '''
    ground_up_model = Sequential()

    print('loading Xception base...')
    Xception_cnn_model = xception.Xception(weights='imagenet', include_top=False, input_shape=(299, 299, 3))

    print('building custom dense addon...')
    model = Sequential()

    model.add(GlobalAveragePooling2D(input_shape=Xception_cnn_model.output_shape[
                                                 1:]))  # the [1:] is necessary to allow for automatic batch dimension to be added by keras

    model.add(Dense(512,
                    activation='relu',
                    kernel_regularizer=regularizers.l2(0.01)))
    model.add(Dropout(0.2))
    model.add(Dense(256,
                    activation='relu',
                    kernel_regularizer=regularizers.l2(0.01)))
    model.add(Dropout(0.2))
    model.add(Dense(12, activation='softmax'))

    model.summary()

    print('assembling composite model...')
    ground_up_model.add(Xception_cnn_model)
    ground_up_model.add(model)

    for layer in ground_up_model.layers[0].layers:
        layer.trainable = False

    print('compiling composite model...')

    # ground_up_1
    # ground_up_model.compile(loss='categorical_crossentropy',
    #              optimizer=optimizers.SGD(lr=1.0e-4, momentum=0.9),
    #              metrics=['accuracy'])

    ground_up_model.compile(loss='categorical_crossentropy',
                            optimizer='adam',
                            metrics=['accuracy'])

    if weights is not None:
        print('loading last iteration...')
        # current last was 'saved_models/weights.best.groundup_1.hdf5'
        ground_up_model.load_weights(weights)

    print('done.')
    return ground_up_model


def final_predict_xception(final_model, img_path, topk=3):
    # obtain predicted vector
    img = load_img(img_path, target_size=(299, 299))
    x = img_to_array(img)
    x = np.expand_dims(x, axis=0)
    y = xception.preprocess_input(x) / 255
    predicted_vector = final_model.predict(y)
    # return dog breed that is predicted by the model
    results = sorted(enumerate(predicted_vector[0]), reverse=True, key=lambda x: x[1])
    classes_ind = [x[0] for x in results]
    # load list of cat names
    cat_names = utils.loadRaceCat()
    classes = [cat_names[x] for x in classes_ind][:topk]
    probs = [x[1] for x in results][:topk]

    # plot results
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 5))

    img = mpimg.imread(img_path)
    ax1.imshow(img)

    ind = np.arange(len(classes))
    ax2.bar(ind, probs, align='center', alpha=.75)
    ax2.set_xticks(ind)
    ax2.set_xticklabels(classes, rotation=90)

    return classes[0]


def getCatBreed(img):
    if 'ground_up_model' not in locals():
        ground_up_model = load_ground_up_model('./model/cat_breed_model.h5')

    prediction = final_predict_xception(ground_up_model, img, topk=5)

    return prediction
