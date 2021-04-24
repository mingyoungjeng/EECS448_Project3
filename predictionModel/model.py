from google.colab import files
from google.colab import drive
import tensorflowjs as tfjs
from tensorflow.keras.optimizers import SGD, Adam
from tensorflow.keras.layers import Dropout
import tensorflow as tf
from pymongo import MongoClient
import numpy as np
import pandas as pd
!pip install dnspython
!pip install tensorflowjs


# GPU functionality not working right now


# Read data from database
# Returns data as a list

def loadData():
    # Connect to Mongo Atlas server (Don't store this info here)
    client = MongoClient(
        "mongodb+srv://john:john1234@cluster0.0bzbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

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


def generateFakeData():
    X = []
    Y = []
    for i in range(10000):
        X.append([np.random.uniform(0, 1), np.random.uniform(0, 1),
                 np.random.uniform(0, 1), np.random.uniform(0, 1)])
        Y.append(np.random.choice(5, 1))
    return X, Y

    # Massage the data


X_fake, Y_fake = generateFakeData()
X_fake = np.asarray(X_fake, np.float32)
Y_fake = np.asarray(Y_fake, np.int16)
Y_fake = tf.keras.utils.to_categorical(Y_fake)

print(X_fake.shape, Y_fake.shape)

data = loadData()
X, Y = makeKeywordDict(data)

X_np = np.asarray(X, np.float32)
Y_np = np.asarray(Y, np.int16)

print(X_np.shape[1])
Y_np = tf.keras.utils.to_categorical(Y_np)

# Pick data for model
X_np = X_fake
Y_np = Y_fake

print(X_np.shape, Y_np.shape)

numInputs = X_np.shape[1]
numOutputs = Y_np.shape[1]

model = tf.keras.Sequential([
    tf.keras.layers.Dense(4, activation='relu'),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(4, activation='softmax')
])

# Construct model
model = tf.keras.Sequential()

# Set dropout percentage
dp = 0.2

# Input layer
model.add(tf.keras.layers.InputLayer(input_shape=X_np.shape[1]))

# three dense layers
model.add(tf.keras.layers.Dense(numInputs * 2, activation='relu'))
model.add(Dropout(dp))

model.add(tf.keras.layers.Dense(numInputs * 4, activation='relu'))
model.add(Dropout(dp))

model.add(tf.keras.layers.Dense(numOutputs * 2, activation='relu'))
model.add(Dropout(dp))

# final activation layer
model.add(tf.keras.layers.Dense(numOutputs, activation='softmax'))

sgd = SGD(learning_rate=0.05, decay=1e-6, momentum=0.7, nesterov=False)
adam = Adam(learning_rate=0.001, beta_1=0.9,
            beta_2=0.999, epsilon=1e-07, amsgrad=True)

# Compile model


model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.build(input_shape=(X_np.shape))
model.summary()

# Training

model.fit(X_np, Y_np, epochs=10)

predictions = model(X_np)
# print(predictions)


model.evaluate(X_np, Y_np)

# save model to google drive

# save in newer keras format with .json and .bin files
tfjs.converters.save_keras_model(model, "/model/keras")

# saves in traditional .pb format
model.save("/model/original")
