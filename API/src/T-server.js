// npm modules
const express = require('express');
const session = require("express-session")({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
const passport = require("passport");
const cors = require('cors')
const fileupload = require('express-fileupload');

// modules for https
const fs = require('fs');

//const http = require('http');
const https = require('https');

// https initialization
const privateKey  = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/privkey.pem", 'utf8');
const certificate = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/cert.pem", 'utf8');
const ca = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/chain.pem", 'utf-8');
const credentials = {key: privateKey, cert: certificate, ca: ca};

// passport serializer and deserializer
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done){
    done(null, user)
});

// constants
const PORT = process.argv[2];
const REQUEST_BASE = '/api';

// router
const router = express.Router();

// service modules
const users = require('./service/service_modules/T-volunteers')();
const orgs = require('./service/service_modules/T-orgs')();
const posts = require('./service/service_modules/T-posts')();
const events = require('./service/service_modules/T-events')();
const auth = require('./service/service_modules/T-auth')();
const images = require('./service/service_modules/T-images');

// service
const service = require('./service/T-service')(users, orgs, posts, events, auth, images);

// api
const api = require('./api/T-api')(router, service);

// cors
const corsOptions = {
    origin: true,
    credentials: true
}

// express initialization
const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(session);
app.use(fileupload({}));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(REQUEST_BASE, router);

//const server = http.createServer(app);
const server = https.createServer(credentials, app);
server.listen(PORT, () => console.log(`Server started at port ${PORT}`))