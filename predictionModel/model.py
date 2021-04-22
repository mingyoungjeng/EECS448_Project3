import pandas as pd
from pymongo import MongoClient

# GPU functionality not working right now
import tensorflow as tf


# Requires dnspython

# Connect to Mongo Atlas server (Don't store this info here)
client = MongoClient("mongodb+srv://john:john1234@cluster0.0bzbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

# Query database for all data and convert to list
db = client.ciandb.data.find()
temp = list(db)

# Print all entries as a test
for x in temp:
    print(x)
