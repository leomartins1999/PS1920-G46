// error module
const error = require('./T-error')();

module.exports = (router, service) => {

    /*
    Endpoints
     */

    router.use('/', log);

    router.post('/users', createUser);
    router.get('/users', getUsers);
    router.get('/users/:id', getUserById);
    router.delete('/users/:id', removeUser);

    router.post('/posts', createPost);
    router.get('/posts', getAllPosts);
    router.get('/posts/:id', getPostById);
    router.get('/posts/owner/:id', getPostsByOwner);
    router.delete('/posts/:id', removePost);

    router.post('/orgs', createOrg);
    router.get('/orgs', getAllOrgs);
    router.get('/orgs/:id', getOrgById);
    router.delete('/orgs/:id', removeOrg);

    router.post('/events', createEvent);
    router.get('/events', getAllEvents);
    router.get('/events/:id', getEventById);
    router.get('/events/org/:id', getEventsByOrg);
    router.delete('/events/:id', removeEvent);

    router.use('/', unknownURI);

    /*
    Users
     */

    function createUser(req, res){
        service.createUser(req.body)
            .then(
                (result) => handleSuccess(res, 201, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getUsers(req, res){
        service.getUsers()
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getUserById(req, res){
        service.getUserById(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function removeUser(req, res){
        service.removeUser(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    /*
    Posts
     */

    function createPost(req, res){
        service.createPost(req.body)
            .then(
                (result) => handleSuccess(res, 201, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getAllPosts(req, res) {
        service.getAllPosts()
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getPostById(req, res){
        service.getPostById(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getPostsByOwner(req, res){
        service.getPostsByOwner(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function removePost(req, res){
        service.removePost(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    /*
    Orgs
     */

    function createOrg(req, res){
        service.createOrg(req.body)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getAllOrgs(req, res){
        service.getAllOrgs()
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getOrgById(req, res){
        service.getOrgById(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function removeOrg(req, res){
        service.removeOrg(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    /*
    Events
     */

    function createEvent(req, res){
        service.createEvent(req.body)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getAllEvents(req, res){
        service.getAllEvents()
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getEventById(req, res){
        service.getEventsById(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getEventsByOrg(req, res){
        service.getEventsByOrg(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function removeEvent(req, res){
        service.removeEvent(req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function handleSuccess(res, statusCode = 200, result){
        // body
        let response = {
            status: "Success",
            body: result
        };

        // status code and headers
        res.statusCode =  statusCode;
        res.setHeader("Content-Type", "application/json");

        // writing body
        res.end(JSON.stringify(response));
    }

    function handleError(res, statusCode, error){
        // body
        let response = {
            status: "Error",
            body: error
        };

        // status code and headers
        res.statusCode =  statusCode;
        res.setHeader("Content-Type", "application/json");

        // writing body
        res.end(JSON.stringify(response));
    }

    function unknownURI(req, res){
        handleError(res, 404, error.unknownUrl(req.originalUrl));
    }

    // logging middleware
    function log(req, res, next){
        // date object
        let date = new Date();

        // logging
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()} - ${req.method} ${req.originalUrl}`);

        // passing to handler
        next();
    }
};