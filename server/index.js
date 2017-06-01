const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const port = 3000;

const app = module.exports = express();

app.use(bodyParser.json());

const connectionInfo = "postgres://owstpiecpxpgmx:2bd7ab3adbea2e6c9e7778789c6947fe3c6b8d19304af22ca214eeb9086cf015@ec2-23-23-234-118.compute-1.amazonaws.com:5432/dc8ucdr21vr6ft?ssl=true";

const db = massive.connectSync({
    connectionString: "postgres://owstpiecpxpgmx:2bd7ab3adbea2e6c9e7778789c6947fe3c6b8d19304af22ca214eeb9086cf015@ec2-23-23-234-118.compute-1.amazonaws.com:5432/dc8ucdr21vr6ft?ssl=true"
}); 
app.set('db', db);

app.get('/api/genres', function(req, res) {
    db.get_genres(function(err, genres){
        res.send(genres);
    }); 
});

app.get('/api/tracks', function(req, res) {
    db.get_tracks(function(err, tracks){
        res.send(tracks);
    });
});

app.get('/api/users', function(req, res) {
    db.get_users(function(err, users){
        res.send(users);
    });
});

app.post('/api/tracks', function(req, res) {
    var track = req.body;
    db.post_track([track.trackLength, track.trackName, track.price, track.img, track.mp3, track.wav, track.genreId, track.creatorId], function(err, result){
        if(err){
            res.status(400).send(err);
        }
        res.status(200).send("Track posted!");
    });
});

app.post('/api/users', function(req, res) {
    var user = req.body;
    db.create_user([user.email, user.userName, user.pass, user.userType, user.description, user.website], function(err, result){
        console.log(result[0]);
        if(err){
            res.status(400).send(err);
        }
        res.status(200).send("User created");
    });
});

app.listen(port, function(){
    console.log("Listening on", port);
});