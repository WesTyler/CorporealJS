var express = require('express');
var routes = require('./server/routes.js')

var app = express();

app.use(express.static(__dirname+'/client'));
app.use('/posts', routes);

var port = process.env.PORT || 3000;
var ip = '0.0.0.0';

app.listen(port, ip);

console.log('Express is listening on',ip+':'+port);