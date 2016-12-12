var express = require("express");
var http = require("http");
var path = require("path");

var port = process.env.PORT || 3000;
var app = express();
var obj = {};

app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res, next){
    res.sendFile(path.join(__dirname + '/views/index.html'));
    next();
});

app.get("/api/whoami/", function(req, res){
    var ip = req.headers["x-forwarded-for"];
    var lang = (req.headers["accept-language"].split(",", 1))[0];
    var sys = req.headers["user-agent"];
    
    obj.ipaddress = ip;
    obj.language = lang;
    obj.software = sys;
    
    res.send(obj);
}).listen(port);