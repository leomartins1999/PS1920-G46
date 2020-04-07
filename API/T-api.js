// error module
const error = require('./T-error')();

module.exports = (router, service) => {

    // logging middleware
    router.use('/', log);

    // authentication middleware
    router.use('/auth', authenticationMw);

    // get volunteers
    router.get('/volunteers', getVolunteers);

    // get volunteer by id
    router.get('/volunteers/:volunteer_id', getVolunteerById);

    // follow volunteer
    router.put('/auth/volunteer/:volunteer_id/follow', followVolunteer);

    // get orgs
    router.get('/orgs', getOrgs);

    // get org by id
    router.get('/orgs/:org_id', getOrgById);

    // follow org
    router.put('/auth/orgs/:org_id/follow', followOrg);

    // create post
    router.post('/auth/posts', createPost);

    // get posts
    router.get('/posts', getPosts);

    // get post by id
    router.get('/posts/:post_id', getPostById);

    // remove post
    router.delete('/auth/posts/:post_id', removePost);

    // like post
    router.put('/auth/posts/:post_id/like', likePost);

    // create event
    router.post('/auth/orgs/events', createEvent);

    // get events
    router.get('/orgs/events', getEvents);

    // get events by org
    router.get('/orgs/:org_id/events', getEventsByOrg);

    // get event by id
    router.get('/orgs/:org_id/events/:event_id', getEventById);

    // remove event
    router.delete('/auth/orgs/:org_id/events/:event_id', removeEvent);

    // volunteer interested in event
    router.put('/auth/orgs/:org_id/events/:event_id/interested', interestedInEvent);

    // volunteer participate in event
    router.put('/auth/orgs/:org_id/events/:event_id/interested', participateInEvent);

    // register in platform
    router.post('/register', register);

    // login
    router.post('/login', login);

    // logout
    router.post('/auth/logout', logout);

    // unknown URL
    router.use('/', unknownURI);

    // handler for get volunteers
    function getVolunteers(req, res){
        handleRequest(res, 200, 400, service.getVolunteer, req.query.name);
    }

    // handler for get volunteer by id
    function getVolunteerById(req, res){
        handleRequest(res, 200, 400, service.getVolunteerById, req.params.volunteer_id);
    }

    function followVolunteer(req, res){
        //handleRequest(res, 200, 400, service.followVolunteer, {user_id: req.user.id, req})
        service.follow(req.user.id, req.user.user_type, req.query.id, req.query.user_type)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    // handler for
    function createPost(req, res){
        service.createPost(new Post(req.user.id, req.body))
            .then(
                (result) => handleSuccess(res, 201, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getPosts(req, res) {
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
        service.removePost(req.params.id, req.user.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function likePost(req, res){
        service.likePost(req.user.id, req.user.user_type, req.params.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    /*
    Orgs
     */

    function getOrgs(req, res){
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
        req.body.org_id = req.user.id;

        service.createEvent(req.body)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function getEvents(req, res){
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
        service.removeEvent(req.params.id, req.user.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }



    function followOrg(req, res){
        service.follow(req.user.id, req.user.user_type, req.query.id, req.query.user_type)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function interestedInEvent(req, res){
        service.interested(req.params.id, req.user.id)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function participateInEvent(req, res){
        service.participate(req.params.id, req.user.id, req.query.id)
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

    function login(req, res){
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

    function handleRequest(res, statusCodeSuccess, statusCodeError, serviceFunction, serviceParams){
        serviceFunction(serviceParams)
            .then(
                (result) => handleSuccess(res, statusCodeSuccess, result),
                (error) => handleError(res, statusCodeError, error)
            );
    }

    function handleSuccess(res, statusCode = 200, result){
        // body
        let response = {
            status: "success",
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
            status: "error",
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