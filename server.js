import express from "express";
import bodyParser from "body-parser"
import {MongoClient, ServerApiVersion} from 'mongodb';
import cors from "cors";
const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const dburl = "mongodb+srv://root:pass@cluster0.i9nhywo.mongodb.net/?retryWrites=true&w=majority";


app.use(cors());



app.get("/api/teams", async (req, res) => {
    const {name } = req.params;

    const client = new MongoClient(dburl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();

    const db = client.db("footballData");//select db
    
    const teams =  await db.collection("teams").findOne();
     //$push to push object to an array
    await client.close();
    res.json(teams)

});

app.get("/api/fixtures", async (req, res) => {
    

    const client = new MongoClient(dburl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();

    const db = client.db("footballData");//select db
    
    const fixture =  await db.collection("fixtures").findOne({active:"true"});
     
    await client.close();
    res.json(fixture)

});

app.get("/api/allFixtures", async (req, res) => {
    

  const client = new MongoClient(dburl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  await client.connect();

  const db = client.db("footballData");//select db
  
  const fixtures =  await db.collection("fixtures").find({}).toArray();
   
  await client.close();
  res.json(fixtures)

});

app.post("/api/createUser", async (req, res) => {
    const {username, fullname, shop} = req.body;
    
    
    const client = new MongoClient(dburl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();

    const db = client.db("footballData");//select db

    await db.collection("users").insertOne({"username": username, "name": fullname, "shop": shop, teamsSelected: [] });
    await client.close();
});

app.get("/api/getAllUserData", async(req, res) => {
  const client = new MongoClient(dburl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();

    const db = client.db("footballData");//select db

    const userData =  await db.collection("users").find({}).toArray();
    
    await client.close();
    res.json(userData);
})

app.get("/api/:user", async (req, res) => {
  const {user } = req.params;
  console.log(user);
  const client = new MongoClient(dburl, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    await client.connect();

    const db = client.db("footballData");//select db

    const userData =  await db.collection("users").findOne({username:user});

    await client.close();
    res.json(userData)
});

app.post("/api/chooseTeam/:selectedTeam", async (req, res) => {
    console.log(req.body);
    const {name, previouslySelected} = req.body;
    const {selectedTeam} = req.params;
    console.log(name, previouslySelected, selectedTeam)
    const client = new MongoClient(dburl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  await client.connect();

  const db = client.db("footballData");//select db
  if (previouslySelected != "") {
    await db.collection("users").updateOne({username:name}, {$pop :{teamsSelected: 1}});
    
  } 

  await db.collection("users").updateOne({username:name}, {$push :{teamsSelected: selectedTeam}})
  await client.close();
});





app.listen(8000, () => {
    console.log("listening on 8000");
});
