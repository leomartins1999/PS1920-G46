"use strict";
exports.__esModule = true;
var Repository_1 = require("./src/db/repos/Repository");
var express = require('express');
var session = require("express-session");
var passport = require("passport");
var cors = require('cors');
var fileupload = require('express-fileupload');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);
var AuthController_1 = require("./src/controllers/AuthController");
var fs = require("fs");
var https = require("https");
var http = require("http");
var VolunteersController_1 = require("./src/controllers/VolunteersController");
var OrgsController_1 = require("./src/controllers/OrgsController");
var PostsController_1 = require("./src/controllers/PostsController");
var EventsController_1 = require("./src/controllers/EventsController");
var MiddlewareController_1 = require("./src/controllers/MiddlewareController");
var RequestHandler_1 = require("./src/controllers/RequestHandler");
var Structures_1 = require("./src/Structures");
var ImagesController_1 = require("./src/controllers/ImagesController");
var AuthService_1 = require("./src/service/AuthService");
var VolunteersService_1 = require("./src/service/VolunteersService");
var OrgsService_1 = require("./src/service/OrgsService");
var PostsService_1 = require("./src/service/PostsService");
var EventsService_1 = require("./src/service/EventsService");
var ImagesService_1 = require("./src/service/ImagesService");
// instantiating communication protocol and credentials
var provider, credentials;
if (process.argv[2] === '443') {
    provider = https;
    // https initialization
    var privateKey = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/privkey.pem", 'utf8');
    var certificate = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/cert.pem", 'utf8');
    var ca = fs.readFileSync("/etc/letsencrypt/live/tribute-api.duckdns.org/chain.pem", 'utf-8');
    credentials = { key: privateKey, cert: certificate, ca: ca };
}
else {
    provider = http;
}
// passport serializer and deserializer
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
// cors setup
var corsOptions = {
    origin: true,
    credentials: true
};
// session options
var sessionOptions = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: Repository_1.dbUrl })
};
// api constants
var PORT = process.argv[2];
var REQUEST_BASE = '/api';
var MAX_FILE_SIZE = '50mb';
// router
var router = express.Router();
// setting up services and controllers
var middlewareController = new MiddlewareController_1["default"](router);
var authController = new AuthController_1["default"](new AuthService_1["default"](), router);
var volunteersController = new VolunteersController_1["default"](new VolunteersService_1["default"](), router);
var orgsController = new OrgsController_1["default"](new OrgsService_1["default"](), router);
var postsController = new PostsController_1["default"](new PostsService_1["default"](), router);
var eventsController = new EventsController_1["default"](new EventsService_1["default"](), router);
var imagesController = new ImagesController_1["default"](new ImagesService_1["default"](), router);
// handling other uris
router.use('/', function (req, res) { return RequestHandler_1.handleError(res, 404, new Structures_1.Error("Unknown uri " + req.originalUrl)); });
// express plugins
var app = express();
app.use(cors(corsOptions));
app.use(express.json({ 'limit': MAX_FILE_SIZE }));
app.use(session(sessionOptions));
app.use(morgan('combined'));
app.use(fileupload({}));
app.use(passport.initialize({}));
app.use(passport.session({}));
app.use(REQUEST_BASE, router);
// starting server
var server = process.argv[2] === '443' ?
    provider.createServer(credentials, app) : provider.createServer(app);
// starting to listen
server.listen(PORT, function () { return console.log("Server started at port " + PORT); });
