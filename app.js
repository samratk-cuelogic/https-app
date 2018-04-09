 
 
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/privateKey.key', 'utf8');
var certificate = fs.readFileSync('./ssl/certificate.crt', 'utf8');
 
var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// your express configuration here
app.get('/hello', function (req, res) {
    console.log(req.query);
  res.header('Content-type', 'text/html');
  return res.end('Hello World!');
});
app.get('/', function (req, res) {

    
    var data = {
      "Fruits": [
        "apple",
        "orange"    ]
    };
    res.json(data);
  });
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, function(){
    console.log("server running at 8080")
});
httpsServer.listen(8443, function(){
    console.log("server running at 8443")
});