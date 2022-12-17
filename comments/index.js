const express = require("express");
const {randomBytes} = require("crypto"); //package to create random id 
const bodyParser = require("body-parser"); //package to parse the string in json
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};  // to optimize the data structure to look for all the comments associated with its post

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments', (req, res)=>{
   const commentId = randomBytes(4).toString('hex'); //generating a random comment id
   const {content} = req.body; //pulling the content which is fed by the user inside the incoming request

   const comments = commentByPostId[req.params.id] || []; // to check whether the given post(with its given id) has an array of comments or not, if not then we assign it an empty array 

   comments.push({id: commentId, content}); //we push the commentId and its content in the comments variable with the given post id 

   commentByPostId[req.params.id] = comments;
    res.status(201).send(comments); 
})

app.listen(4001, ()=>{
    console.log("listening at port http://localhost:4001");
})