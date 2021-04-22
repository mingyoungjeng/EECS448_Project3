import pandas as pd
from pymongo import MongoClient


# Required dnspython
client = pymongo.MongoClient("mongodb+srv://john:<password>@cluster0.0bzbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.test
print(db)