// npm modules
const express = require('express');
const session = require("express-session")({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
const passport = require("passport");
const fileupload = require('express-fileupload');

// passport serializer and deserializer
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done){
    done(null, user)
});

// constants
const PORT = 8000;
const REQUEST_BASE = '/api';

// router
const router = express.Router();

// service modules
const users = require('./service/service_modules/T-volunteers')();
const orgs = require('./service/service_modules/T-orgs')();
const posts = require('./service/service_modules/T-posts')();
const events = require('./service/service_modules/T-events')();
const auth = require('./service/service_modules/T-auth')();
const pictures = require('./service/service_modules/T-pictures')('images');

// service
const service = require('./service/T-service')(users, orgs, posts, events, auth, pictures);

// api
const api = require('./api/T-api')(router, service);

// express initialization
const app = express();
app.use(express.json());
app.use(session);
app.use(fileupload());
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(REQUEST_BASE, router);

// server initialization
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));