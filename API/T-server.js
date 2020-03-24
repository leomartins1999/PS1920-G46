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
const users = require('./Service/T-users')();
const orgs = require('./Service/T-orgs')();
const posts = require('./Service/T-posts')();
const events = require('./Service/T-events')();
const auth = require('./Service/T-auth')();

// service
const service = require('./Service/T-service')(users, orgs, posts, events, auth);

// api
const api = require('./T-api')(router, service);

// express initialization
const app = express();
app.use(express.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(REQUEST_BASE, router);

// server initialization
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));