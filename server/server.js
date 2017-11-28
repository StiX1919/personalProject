const express = require('express')
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require("passport-auth0");

const { connectionString } = require('../config').massive;
const { domain, clientID, clientSecret } = require('../config').auth0
const { create, getInfo, newJob, getPosts, editPost, deletePost, editJob, openJobs, acceptJob, acceptedJobs, posterInfo, newComment, getComments } = require('../src/controllers/userController')

const logout = require('express-passport-logout')

const port = 3001;
const app = express();



//MASSIVE
massive(connectionString)
.then(db => app.set('db', db))
.catch(console.log);


app.use(json());
app.use(cors());

app.use(session({
    secret: 'MoveToConfigPlz123',
    resave: false,
    saveUninitialized: false
}));


app.use( passport.initialize() )
app.use( passport.session() )

passport.use( 
    new Auth0Strategy(
  {
    domain,
    clientID,
    clientSecret,
    callbackURL: "/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    
    app.get('db').getUserByAuthId([profile.id]).then(response => {
        // console.log(response)

        if(!response[0]) {
            console.log(profile.id)
            app.get('db').createUserByAuthId([profile.id])
            .then(created => {
                return done(null, created[0])
            })
        } else {
        
            return done(null, response[0])
            
        }
    })


    // return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})



passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

app.get(
    '/login', passport.authenticate('auth0', {successRedirect: 'http://localhost:3000/Home'}))



//SAVED FOR BUILD
//app.use(express.static(`${__dirname}/public/build`));
//

app.get("/api/test", (req, res, next) => {
    req.app.get('db').getUsers()
    .then(response => {
      res.json(response);
    })
    .catch(console.log)
})

app.get('/api/user', (req, res) => {
    if(!req.user) return res.status(500).json({err: 'Failure'});
    else res.status(200).json(req.user)
})

app.post('/api/addUser', create)
app.get('/api/info', getInfo)

app.post('/api/addJob', newJob)
app.get('/api/posts', getPosts)
app.get('/api/openJobs', openJobs)
app.get('/api/acceptedJobs', acceptedJobs)
app.post('/api/editJob/:ID', editJob)

app.post('/api/addComment/:ID', newComment)
app.get('/api/getComments/:ID', getComments)

app.get('/api/editPost/:ID', editPost)
app.get('/api/poster/:ID', posterInfo)
app.delete('/api/deletePost/:ID', deletePost)

app.post('/api/acceptJob/:PID', acceptJob)

app.get('/logout', logout());


//LISTENING
app.listen (port, ()=> {
    console.log(`Listening on port: ${port}`);
})