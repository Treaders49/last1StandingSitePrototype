from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://root:pass@cluster0.i9nhywo.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mydb = client["footballData"]
mycol = mydb["teams"]



mycol.insert_one({"teams" : [{"team": "Arsenal", "pic": "t3.png"}, {"team": "Aston Villa", "pic": "t7.png"}, {"team": "Bournemouth", "pic": "t91.png"}, {"team": "Brentford", "pic": "t94.png"}, {"team": "Brighton", "pic": "t36.png"}, {"team": "Burnley", "pic": "t90.png"}, {"team": "Chelsea", "pic": "t8.png"}, {"team": "Crystal Palace", "pic": "t31.png"}, {"team": "Everton", "pic": "t11.png"}, {"team": "Fulham", "pic": "t54.png"}, {"team": "Liverpool", "pic": "t14.png"}, {"team": "Luton", "pic": "t102.png"}, {"team": "Man City", "pic": "t43.png"}, {"team": "Man United", "pic": "t1.png"}, {"team": "Newcastle", "pic": "t4.png"}, {"team": "Nott'm Forest", "pic": "t17.png"}, {"team": "Sheffield Utd", "pic": "t49.png"}, {"team": "Spurs", "pic": "t6.png"}, {"team": "West Ham", "pic": "t21.png"}, {"team": "Wolves", "pic": "t39.png"}]})