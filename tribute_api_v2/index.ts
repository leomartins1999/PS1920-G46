// npm modules
const express = require('express');
const session = require("express-session")({secret: 'keyboard cat', resave: true, saveUninitialized: true});
const passport = require("passport");
const cors = require('cors')
const fileupload = require('express-fileupload');
const morgan = require('morgan')

import AuthController from "./src/controllers/AuthController";

import * as fs from "fs";
import * as https from "https";
import * as http from "http";

import VolunteersController from "./src/controllers/VolunteersController";
import OrgsController from "./src/controllers/OrgsController";
import PostsController from "./src/controllers/PostsController";
import EventsController from "./src/controllers/EventsController";
import MiddlewareController from "./src/controllers/MiddlewareController";
import {handleError} from "./src/controllers/RequestHandler";
import {Error} from "./src/Structures";
import ImagesController from "./src/controllers/ImagesController";
import AuthService from "./src/service/AuthService";
import VolunteersService from "./src/service/VolunteersService";
import OrgsService from "./src/service/OrgsService";
import PostsService from "./src/service/PostsService";
import EventsService from "./src/service/EventsService";
import ImagesService from "./src/service/ImagesService";

// instantiating communication protocol and credentials
let provider, credentials;
if (process.argv[2] === '443') {
    provider = https

    // https initialization
    const privateKey = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/privkey.pem", 'utf8');
    const certificate = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/cert.pem", 'utf8');
    const ca = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/chain.pem", 'utf-8');
    credentials = {key: privateKey, cert: certificate, ca: ca};
} else {
    provider = http
}

// passport serializer and deserializer
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user)
});

// cors setup
const corsOptions = {
    origin: true,
    credentials: true
}

// api constants
const PORT = process.argv[2]
const REQUEST_BASE = '/api'
const MAX_FILE_SIZE = '50mb'

// router
const router = express.Router()

// setting up services and controllers
const middlewareController = new MiddlewareController(router)
const authController = new AuthController(new AuthService(), router)
const volunteersController = new VolunteersController(new VolunteersService(), router)
const orgsController = new OrgsController(new OrgsService(), router)
const postsController = new PostsController(new PostsService(), router)
const eventsController = new EventsController(new EventsService(), router)
const imagesController = new ImagesController(new ImagesService(), router)

// handling other uris
router.use('/', (req, res) => handleError(res, 404, new Error(`Unknown uri ${req.originalUrl}`)))

// express plugins
const app = express()
app.use(cors(corsOptions))
app.use(express.json({'limit': MAX_FILE_SIZE}));
app.use(session);
app.use(morgan('combined'))
app.use(fileupload({}));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(REQUEST_BASE, router);

// starting server
const server = process.argv[2] === '443' ?
    provider.createServer(credentials, app) : provider.createServer(app)

// starting to listen
server.listen(PORT, () => console.log(`Server started at port ${PORT}`))