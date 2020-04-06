// npm modules
const express = require('express');
const session = require("express-session")({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
const passport = require("passport");

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
const users = require('./service/T-volunteers')();
const orgs = require('./service/T-orgs')();
const posts = require('./service/T-posts')();
const events = require('./service/T-events')();
const auth = require('./service/T-auth')();

// service
const service = require('./service/T-service')(users, orgs, posts, events, auth);

// api
const api = require('./T-api')(router, service);

// express initialization
const app = express();
app.use(express.json());
app.use(session);
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(REQUEST_BASE, router);

// server initialization
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));