import pandas as pd
import numpy as np
from pymongo import MongoClient

# GPU functionality not working right now
import tensorflow as tf
from tensorflow.keras.layers import Dropout
from tensorflow.keras.optimizers import SGD, Adam

# Read data from database
# Returns data as a list
def loadData():
    # Connect to Mongo Atlas server (Don't store this info here)
    client = MongoClient("mongodb+srv://john:john1234@cluster0.0bzbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

    # Query database for all data and convert to list
    db = client.ciandb.data.find()
    data = list(db)
    return data

# Takes list of data and converts it into tensor objects
def trimData(data):
    return

# Takes in a list of data and maps the keywords to integers representing categories
def makeKeywordDict(data):
    # Should asser data is a dictionary with key keyword
    X = []
    Y = []
    Y_dict = {}
    index = 0
    for datum in data:
        key = datum.get('keyword')
        if key not in Y_dict.keys():
            Y_dict[key] = index
            index += 1

        X.append(datum.get('data'))
        Y.append(Y_dict[key])

    print(Y_dict)
    return X, Y

data = loadData()
X, Y = makeKeywordDict(data)

X_np = np.asarray(X, np.float32)
Y_np = np.asarray(Y, np.int16)

# onehotencord Y data
Y_np = tf.keras.utils.to_categorical(Y_np, 3)

# Construct model
model = tf.keras.Sequential()

# Set dropout percentage
dp = 0.2

# Input layer
model.add(tf.keras.layers.InputLayer(input_shape=X_np.shape[1]))

# three dense layers
model.add(tf.keras.layers.Dense(6, activation = 'relu'))
model.add(Dropout(dp))

model.add(tf.keras.layers.Dense(12, activation = 'relu'))
model.add(Dropout(dp))

model.add(tf.keras.layers.Dense(6, activation = 'relu'))
model.add(Dropout(dp))

# final activation layer
model.add(tf.keras.layers.Dense(10, activation = 'softmax'))

sgd = SGD(learning_rate=0.05, decay = 1e-6, momentum = 0.7, nesterov = False)
adam = Adam(learning_rate=0.001, beta_1=0.9, beta_2=0.999, epsilon=1e-07, amsgrad = True)

# Compile model
model.compile(loss = 'categorical_crossentropy',
             optimizer = adam,
             metrics = ['accuracy'])
























# X_tensor = tf.Tensor(X, shape=(X.count(), X[0].count()), dtype=float64)
