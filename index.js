const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.SERVER_PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// vercel project link : https://vercel.com/shah-aloms-projects/user-management-systemt-server
// email :sahalom47......

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true 
}));


app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r31xce1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {


        const userCollections = client.db("newUserDB").collection('newUser');

        //  add user 
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollections.insertOne(newUser);
            res.send(result)
        });


        // get multiple data
        app.get('/users', async(req, res) => {
            const cursor = userCollections.find();
            const result =  await cursor.toArray()
            res.send(result)
        })

        // get single data 
        app.get('/user/:id', async(req, res) => {
            const id= req.params.id
             const query = { _id: new ObjectId(id) };
             const result = await userCollections.findOne(query);
            res.send(result)
        })



        // update data 
        app.patch('/user/:id', async(req, res) => {
            const data = req.body
            const id= req.params.id
            const filter  = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                  name:data.name,
                  email:data.email,
                },
              };
              const result = await userCollections.updateOne(filter, updateDoc);
             res.send(result)
         })



        // delete data
        app.delete('/user/:id', async(req, res) => {
           const id= req.params.id
            const query = { _id: new ObjectId(id) };
            const result = await userCollections.deleteOne(query);
            res.send(result)
        })



        //  user related api  

        // create user

        // get multiple user

        // update user 


        // delete a user






        console.log("Pinged your deployment. You successfully connected to MongoDB! m");
    } finally {

        // await client.close();
    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!sss f')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})