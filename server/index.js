const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./config');
const aws = require('aws-sdk');
const fs = require('fs');

const S3FS = require('s3fs');
const s3fsImp = new S3FS('personalprojectmedia', {
    accessKeyId: ,
    secretAccessKey: 
});

s3fsImp.create();
console.log(s3fsImp);

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

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
//app.engine('html', require('ejs').renderFile);
//
//const S3_BUCKET = process.env.S3_BUCKET;


var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors());



app.use(function(req, res, next){
    var allowedOrigins = ['http://localhost:8080'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', ['GET','PUT','POST','DELETE']);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
})
 app.use(multipartyMiddleware);


const db = massive.connectSync({
    connectionString: "postgres://owstpiecpxpgmx:2bd7ab3adbea2e6c9e7778789c6947fe3c6b8d19304af22ca214eeb9086cf015@ec2-23-23-234-118.compute-1.amazonaws.com:5432/dc8ucdr21vr6ft?ssl=true"
}); 
app.set('db', db);



//------------S3 REQUESTS------------------------------------------------



app.post('/aws/imgUpload', function(req, res){
    var file = req.files.null;
//    console.log('--------------------', file.path);
    var stream = fs.createReadStream(file.path);
    s3fsImp.bucket = 'personalprojectmedia/images';
    return s3fsImp.writeFile(file.originalFilename, stream).then(function(){
        fs.unlink(file.path, function(err){
            if(err){
                console.log(err);
            }
        })
        res.send('POSTED MEDIA!');
    });
})

app.post('/aws/audioUpload', function(req, res){
    var file = req.files.null;
    console.log('--------------------', file);
    var stream = fs.createReadStream(file.path);
    s3fsImp.bucket = 'personalprojectmedia/audio';
    return s3fsImp.writeFile(file.originalFilename, stream).then(function(){
        fs.unlink(file.path, function(err){
            if(err){
                console.log(err);
            }
        })
        res.send('POSTED MEDIA!');
    });
})

var viewAudio = function(folderName, fileName){
        var audioFolderKey = encodeURIComponent(folderName) + '//';
        s3fsImp.listObjects({Prefix: audioFolderKey}, function(err, data) {
            if(err) {
                return alert('There was an error viewing your album: ' + err.message);
            }
            var href = this.request.httpRequest.endpoint.href;
            var bucketUrl = href + folderName + '/';
            
            var files = data.Contents.map(function(file) {
                var fileObj = {
                    fileKey: file.Key,
                    fileUrl: bucketUrl + encodeURIComponent(file.Key)
                }
                
                if(file.Key == fileName){
                    return fileObj;
                }
            })
            return 'File not found';
        })
    }

app.get('/aws/audio/:name', function(req, res){
    var folderName = 'audio';
    var fileName = req.params.name;
    
    res.send(viewAudio(folderName, fileName));
    
    
})

//audio/SampleAudio_0.7mb.mp3

//------------AUTH0 REQUESTS---------------------------------------------



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
       passport.authenticate('auth0', {successRedirect: 'http://localhost:8080/'}), function(req, res){
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

app.get('/api/genres/:id', function(req, res) {
    var genre = req.params;
    console.log(genre);
    db.get_tracksByGenreId([genre.id], function(err, tracks){
        res.send(tracks);
    })
})

app.get('/api/tracks', function(req, res) {
    db.get_tracks(function(err, tracks){
        res.send(tracks);
    });
});

app.get('/api/tracks/:id', function(req, res) {
    var myTrack = req.params;
    db.get_trackByTrackId([myTrack.id], function(err, track){
        res.send(track)
    })
})

app.get('/api/users', function(req, res) {
    db.get_users(function(err, users){
        res.send(users);
    });
});

app.get('/api/users/:id', function(req, res){
    var user = req.params;
    db.get_userById([user.id], function(err, user){
        res.send(user);
    })
})

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