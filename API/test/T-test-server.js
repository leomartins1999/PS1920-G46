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
const PORT = 9000;
const REQUEST_BASE = '/api';

// router
const router = express.Router();

module.exports = () => {
    return {
        startServer: startServer,
        closeServer: closeServer,

        baseURI: `localhost:${PORT}/api`,
    };

    let server = null;

    function startServer(){
        const router = express.Router();

        const service = require('./ServiceMock');

        const api = require("../T-api")(router, service);

        const app = express();
        app.use(express.json());
        app.use(session);
        app.use(passport.initialize({}));
        app.use(passport.session({}));
        app.use(REQUEST_BASE, router);

        server = app.listen(PORT, () => console.log(`Test Server started at port ${PORT}`));
    }

    function closeServer() {
        server.close();
    }
};