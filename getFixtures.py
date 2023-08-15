from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

import requests
import re
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from datetime import date
import time
service = Service()
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)
driver.get("https://fantasy.premierleague.com/fixtures")
time.sleep(2)
driver.find_element(By.ID, "onetrust-accept-btn-handler").click()
fixtureArray =[]

fixtures = driver.find_elements(By.CLASS_NAME, "ccqgMo")
gameWeek = (driver.find_element(By.CLASS_NAME, "gVweXV").find_element(By.TAG_NAME, "span").text).split(" ")[1].replace(":", "")
print(gameWeek)
for fixture in fixtures:
    home = fixture.find_elements(By.CLASS_NAME, "fYZMeF")[0].text
    away = fixture.find_elements(By.CLASS_NAME, "fYZMeF")[1].text
    fixtureArray.append({"home": home, "away": away})

print(fixtureArray)




uri = "mongodb+srv://root:pass@cluster0.i9nhywo.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

mydb = client["footballData"]
mycol = mydb["fixtures"]
mycol.update_many({"active":"true"},{{"$set": {"active":"false"}}} )


mycol.insert_one({"week": gameWeek, "fixtures": fixtureArray, "winners":[], "active":"true" })