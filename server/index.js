var express = require('express');
var bodyParser = require('body-parser');
var Massive = require('massive');
var browserify = require('browserify');

var port = 3000;

var app = express();
app.use(bodyParser.json());

app.get('/api/tracks', function(req, res) {
    res.send('Hello World!');
});

app.listen(port, function(){
    console.log("Listening on", port);
});