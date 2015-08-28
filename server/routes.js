var utils = require('./utils.js');
var routes = module.exports = function(req, res) {

  var actions = {
    GET : function(req, res) {
      if (req.url === '/keepalive') {
        utils.keepAlive();
      } else if (req.url.substr(2).length > 0){
        utils.getSinglePost(req.url.substr(2), function(results){
          res.send(results.results[0])
        })
      }else{      
        utils.getPosts(function(results){
          res.send(results)
        }); //Send back results of DB query
      }
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