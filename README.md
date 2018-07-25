### Using Redis with Node.js
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

Once you have done with Express and MongoDB you are good to go. Let’s create add below two lines index.js, and see how to connect with Redis from Node.js.
```
const redis = require('redis');
const client = redis.createClient();
```
By default, redis.createClient() will use 127.0.0.1 and 6379 as the hostname and port respectively. If you have a different host/port you can supply them as following:

```
const client = redis.createClient(port, host);
```
### Storing Key-Value Pairs

Now that you know how to connect with Redis from Node.js, let’s see how to store key-value pairs in Redis storage.

```
const getProjects = (req, res) => {
  database.collection('projects').find({"project_id":req.body.id}).toArray(function(err, col) {
    if(err) throw err
    client.setex(req.body, 60, JSON.stringify(col));
    res.json(col);
  
  });
}
```

The above snippets store a simple JSON fetched from database against the key framework and here req.body is the Key.

To retrieve the value of the key do the following:
```
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
```
client.get() lets you retrieve a key stored in Redis. The value of the key can be accessed via the callback argument reply. If the key doesn’t exist, the value of result will be empty.

### Conclusion
I have covered the basic and most commonly used operations in node_redis. You can use this module to leverage the full power of Redis and create really sophisticated Node.js apps. You can build many interesting things with this library such as a strong caching layer, a powerful Pub/Sub messaging system and more.  To know more about the library check out their [documentation](https://www.npmjs.com/package/redis).



