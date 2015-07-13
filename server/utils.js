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
  c.content, c.summary, p.title, u.username \
  FROM contents c \
  INNER JOIN users u ON c.user_id = u.id \
  INNER JOIN posts p ON c.post_id = p.id \
  ;", 
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