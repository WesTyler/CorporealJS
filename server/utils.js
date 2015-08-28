var pg = require('pg'); //Refactoring to Postgres
var bodyParser = require('body-parser');
var config = require('./config.js');

var utils = module.exports = {};

//Using Postgres

var dbConnection = new pg.Client(process.env.DATABASE_URL || config.credentials)
dbConnection.connect();

utils.getPosts = function(cb){
  dbConnection.query("SELECT \
  p.id, p.title, u.username, p.summary, p.content \
  FROM posts p \
  INNER JOIN users u ON p.user_id = u.id;", 
  function(err, results){
    if (err) {cb(404)}
    else {cb({results: results.rows});}
 });
};

utils.getSinglePost = function(postID, cb){
  dbConnection.query("SELECT \
  p.id, p.title, u.username, p.summary, p.content \
  FROM posts p \
  INNER JOIN users u ON p.user_id = u.id WHERE p.id=$1;",[''+postID], 
  function(err, results){
    if (err) {cb(404)}
    else {cb({results: results.rows});}
  });
}


//Using MySQL: 
// var dbConnection = mysql.createConnection({
//   host: credentials.host,
//   user: credentials.user,
//   password: credentials.pass,
//   database: credentials.database
// });

// dbConnection.connect();

// utils.getPosts = function(cb){
//  dbConnection.query("SELECT \
//   p.id, p.title, u.username, p.summary, p.content \
//   FROM posts p \
//   INNER JOIN users u ON p.user_id = u.id;", 
//   function(err, results){
//     if (err) {cb(404)}
//     else {cb({results: results});}
//  });

//  utils.keepAlive = function(){
//   dbConnection.query("SELECT 1 FROM users;")
//  }
// }