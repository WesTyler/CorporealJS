var mysql = require('mysql');
var bodyParser = require('body-parser');
var adminPass = require('config');

var utils = module.exports = {};

var dbConnection = mysql.createConnection({
  user: "admin",
  password: adminPass,
  database: "blog",
});

dbConnection.connect();

utils.getPosts = function(cb){
  console.log('Querying DB from utils.js')
 dbConnection.query("SELECT \
  p.title, u.username, p.summary, p.content \
  FROM posts p \
  INNER JOIN users u ON c.user_id = u.id;", 
  function(err, results){
   if (err) {cb(404)}
   cb({results: results});
 });
}
// Send back
/* {
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