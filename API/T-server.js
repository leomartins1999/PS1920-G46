// npm modules
const express = require('express');

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

// service
const service = require('./Service/T-service')(users, orgs, posts, events);

// api
const api = require('./T-api')(router, service);

// express initialization
const app = express();
app.use(express.json());
app.use(REQUEST_BASE, router);

// server initialization
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));