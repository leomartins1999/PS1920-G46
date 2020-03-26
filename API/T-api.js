// error module
const error = require('./T-error')();

module.exports = (router, service) => {

    /*
    Endpoints
     */

    router.use('/', log);

    // common endpoints

    router.get('/users', getUsers);
    router.get('/users/:id', getUserById);

    router.get('/posts', getAllPosts);
    router.get('/posts/:id', getPostById);
    router.get('/posts/owner/:id', getPostsByOwner);

    router.get('/orgs', getAllOrgs);
    router.get('/orgs/:id', getOrgById);

    router.get('/events', getAllEvents);
    router.get('/events/:id', getEventById);
    router.get('/events/org/:id', getEventsByOrg);

    // authenticated endpoints

    router.post('/auth/register', register);
    router.post('/auth/authenticate', authenticate);

    // authentication middlewares
    router.use('/auth', authenticationMw);
    router.use('/auth/users', userMw);
    router.use('/auth/orgs', orgMw);

    router.get('/auth/logout', logout);
    router.delete('/auth/remove', remove);

    router.post('/auth/posts', createPost);
    router.delete('/auth/posts/:id', removePost);

    router.post('/auth/events', orgMw, createEvent);
    router.delete('/auth/events/:id', orgMw, removeEvent);

    router.use('/', unknownURI);

    /*
    Users
     */

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

    /*
    Authentication
     */

    function register(req, res){
        service.register(req.body)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function authenticate(req, res){
        service.authenticate(req.body)
            .then(
                (result) => {
                    req.login({id: result.id, user_type: result.user_type}, _ => handleSuccess(res, 200, result))
                }, err => handleError(res, 401, err)
            );
    }

    function remove(req, res){
        service.remove(req.user)
            .then(
                (_) => res.redirect('/api/auth/logout'),
                (error) => handleError(res, 400, error)
            );
    }

    function logout(req, res){
        req.logout();
        handleSuccess(res, 200, {status: 'Logout completed.'})
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

    // authentication middleware
    function authenticationMw(req, res, next){
        (!req.user)?
            handleError(res, 401 , error.authenticationError('User is not authenticated.')) :
            next();
    }

    function userMw(req, res, next){
        (req.user.user_type !== 'user')?
            handleError(res, 401, error.authenticationError('Invalid authenticated user type.')) :
            next();
    }

    function orgMw(req, res, next){
        (req.user.user_type !== 'org')?
            handleError(res, 401, error.authenticationError('Invalid authenticated user type.')) :
            next();
    }

};