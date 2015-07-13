var utils = require('./utils.js');
var routes = module.exports = function(req, res) {

  var actions = {
    GET : function(req, res) {
      console.log('calling utils query')
      utils.getPosts(function(results){
        console.log('sending response after query')
        res.send(results)
      }); //Send back results of DB query
    },
    OPTIONS : function(req, res) {
      res.sendStatus(200); // CORS 
    }
  }

  if (actions[req.method]) {
    actions[req.method](req, res);
  } else {
    res.sendStatus(401); //Site is view only right now. Will add POST handler for comments later.
  }

};