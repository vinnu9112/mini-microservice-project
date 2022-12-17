const express = require("express");
const {randomBytes} = require("crypto"); //package to create random id 
const bodyParser = require("body-parser"); //package to parse the string in json
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {}

app.get("/posts", (req, res)=>{
    res.send(posts);
})
app.post("/posts", (req, res)=>{
    const id = randomBytes(4).toString('hex'); //random id of 4 bytes parsing it in string

    const {title} = req.body;

    posts[id]={
        id,
        title,
    }; //assigning id, title to posts object

    res.status(201).send(posts[id]);

})

app.listen(4000, ()=>{
    console.log("listening on port http://localhost:4000");
})