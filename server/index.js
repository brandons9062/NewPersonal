const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./config');



const port = 3000;

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('../src'));


var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));



app.use(function(req, res, next){
    var allowedOrigins = ['http://localhost:8080'];
    var origin = req.headers.origin;
    console.log(origin);
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
})



const db = massive.connectSync({
    connectionString: "postgres://owstpiecpxpgmx:2bd7ab3adbea2e6c9e7778789c6947fe3c6b8d19304af22ca214eeb9086cf015@ec2-23-23-234-118.compute-1.amazonaws.com:5432/dc8ucdr21vr6ft?ssl=true"
}); 
app.set('db', db);

passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: '/auth/callback'
    },
  function(accessToken, refreshToken, extraParams, profile, done) {
    //Find user in database
    db.getUserByAuthId([profile.id], function(err, user) {
        console.log(profile._json.email);
        user = user[0];
            if (!user) { //if there isn't one, we'll create one!
        console.log('CREATING USER');
        db.createUserByAuth([profile.id,  profile.displayName, profile._json.email], function(err, user) {
          console.log('USER CREATED', user);
          return done(err, user); // GOES TO SERIALIZE USER
        })
      } else { //when we find the user, return it
        console.log('FOUND USER', user);
        return done(err, user[0]);
      }
    })
  }
));

passport.serializeUser(function(userA, done){
    console.log('serializing', userA);
    var userB = userA;
    done(null, userB);
});

passport.deserializeUser(function(userB, done){
    var userC = userB;
    done(null, userC);
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback',
       passport.authenticate('auth0', {successRedirect: 'http://localhost:8080/genres'}), function(req, res){
    res.status(200).send(req.user);
})
app.get('/auth/me', function(req, res){
    if(!req.user){
        return res.sendStatus(404);
    }
    res.status(200).send(req.user);
})
app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
})



//-------------GET REQUESTS---------------------------------------------



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

app.get('/api/producers', function(req, res) {
    db.get_producers(function(err, producers){
        res.send(producers);
    })
})

app.get('/api/artists', function(req, res) {
    db.get_artists(function(err, artists){
        res.send(artists);
    })
})



//----------------POST REQUESTS-----------------------------------------

app.post('/api/tracks', function(req, res) {
    var track = req.body;
    console.log(track);
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