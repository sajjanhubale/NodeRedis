When trying to optimise our applications, one of the first things we look to is caching. Caching involves storing data in a high performance store (many times temporarily) so such data can be retrieved faster at a later time. Redis is an efficient key-value data store that has become very popular for caching. One of the things that makes Redis a good choice is the number of data structures it supports — such as strings, hashes, lists, sets, and so on. This gives us some flexibility!

##### The first step is to enter the following command to create the initial structure of your new project:
```
npm init
```
##### Then, we have to install Express and the MongoDB driver and save them as dependencies:
```
npm install express --save
npm install mongodb --save
```
##### Now, it’s time to create the main file called index.js. It’s the file where we’ll do most of our work. Start off by creating a simple app, connecting it to MongoDB and listening on port 7000:

```
//Define all dependencies needed
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

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

app.listen(7000, function() {
  console.log('Your node is running on port 7000 !!!')
});

```




