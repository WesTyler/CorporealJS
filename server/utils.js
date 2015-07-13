var mysql = require('mysql');
var bodyParser = require('body-parser');
var adminPass = require('./config.js');

var utils = module.exports = {};

var dbConnection = mysql.createConnection({
  user: "admin",
  password: adminPass,
  database: "blog",
});

dbConnection.connect();

utils.getPosts = function(cb){
 dbConnection.query("SELECT \
  p.id, p.title, u.username, p.summary, p.content \
  FROM posts p \
  INNER JOIN users u ON p.user_id = u.id;", 
  function(err, results){
    if (err) {cb(404)}
    else {cb({results: results});}
 });
}
// Send back
/* {
  id: ,
  title: , 
  author: ,
  shortSumm: ,
  content: ,
  comments: [ //Add comments later.
    {username: ,
    title: ,
    comment: 
    },
    {u,t,c}, ...
  ]
}*/