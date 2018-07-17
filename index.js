
'use strict';

//Define all dependencies needed
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo=require('mongodb'); // for converting string to ObjectID
const redis = require('redis');
const client = redis.createClient();
//Load Express Framework
var app = express();

//Create a middleware that adds a X-Response-Time header to responses.

app.listen(7000, function() {
  console.log('Your node is running on port 7000 !!!')
});


var database="";
MongoClient.connect("mongodb://localhost:27017/demo", function(err, db) {
  if(!err) {
    console.log("We are connected");
    database=db;
   console.log(database);
  }
  else {
    console.log(err);
  }
 
 
});

const getProjects = (req, res) => {
  database.collection('projects').find({"project_id":req.body.id}).toArray(function(err, col) {
    if(err) throw err
    client.setex(req.body, 60, JSON.stringify(col));
    res.json(col);
  
  });
}

const getCache = (req, res) => {
  
  //Check the cache data from the server redis
  client.get(req.body, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getProjects(req, res);
    }
  });
}

app.get('/projects',getCache);

process.on('uncaughtException', function (err) {
  console.log(err);
});

