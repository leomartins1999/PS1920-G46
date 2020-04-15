// error module
const error = require('../error/T-error')();

// Params modules
const ServiceParams = require('../model/params/ServiceParams');
const FollowParams = require('../model/params/FollowParams');
const RegisterParams = require('../model/params/RegisterParams');

// dtos modules
const Post = require('../model/dtos/Post');
const _Event = require('../model/dtos/_Event');
const Image = require('../model/dtos/Image');
const User = require('../model/dtos/User');



module.exports = (router, service, test) => {

    // logging middleware
    router.use('/', log);

    // authentication middleware
    router.use('/auth', authenticationMw);

    // get volunteers
    router.get('/volunteers', getVolunteers);

    // get volunteer by id
    router.get('/volunteers/:volunteer_id', getVolunteerById);

    // follow volunteer
    router.put('/auth/volunteers/:volunteer_id/follow', followVolunteer);

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
    router.post('/auth/orgs/events', orgMw, createEvent);

    // get events
    router.get('/events', getEvents);

    // get event by id
    router.get('/events/:event_id', getEventById);

    // get events by org
    router.get('/orgs/:org_id/events', getEventsByOrg);

    // remove event
    router.delete('/auth/orgs/events/:event_id', removeEvent);

    // volunteer interested in event
    router.put('/auth/orgs/events/:event_id/interested', volunteerMw, interestedInEvent);

    // volunteer participate in event
    router.put('/auth/orgs/events/:event_id/participate', orgMw, participateInEvent);

    // register in platform
    router.post('/register', register);

    // login
    router.post('/login', login);

    // logout
    router.get('/logout', logout);

    // get image
    router.get('/images/:image_type/:image_id', getImage);

    // post image
    router.post('/auth/images/:image_type/:image_id', postImage);

    // unknown URL
    router.use('/', unknownURI);

    // handler for get volunteers
    function getVolunteers(req, res){
        handleRequest(res, 200, 400, service.getVolunteers, new ServiceParams(req));
    }

    // handler for get volunteer by id
    function getVolunteerById(req, res){
        handleRequest(res, 200, 400, service.getVolunteerById, new ServiceParams(req));
    }

    // handler for follow volunteer
    function followVolunteer(req, res){
        handleRequest(res, 200, 400, service.followVolunteer, new FollowParams(req, true));
    }

    // handler for get orgs
    function getOrgs(req, res){
        handleRequest(res, 200, 400, service.getOrgs, new ServiceParams(req));
    }

    // handler for get org by Id
    function getOrgById(req, res){
        handleRequest(res, 200, 400, service.getOrgById, new ServiceParams(req));
    }

    // handler for follow org
    function followOrg(req, res){
        handleRequest(res, 200, 400, service.followOrg, new FollowParams(req, false))
    }

    // handler for create post
    function createPost(req, res){
        handleRequest(res, 201, 400, service.createPost, new Post(req));
    }

    // handler for get posts
    function getPosts(req, res) {
        handleRequest(res, 200, 400, service.getPosts, new ServiceParams(req))
    }

    // handler for get post by id
    function getPostById(req, res){
        handleRequest(res, 200, 400, service.getPostById, new ServiceParams(req))
    }

    // handler for remove post
    function removePost(req, res){
        handleRequest(res, 200, 400, service.removePost, new ServiceParams(req))
    }

    // handler for like post
    function likePost(req, res){
        handleRequest(res, 200, 400, service.likePost, new ServiceParams(req))
    }

    // handler for create event
    function createEvent(req, res){
        handleRequest(res, 201, 400, service.createEvent, new _Event(req))
    }

    // handler for get events
    function getEvents(req, res){
        handleRequest(res, 200, 400, service.getEvents, new ServiceParams(req))
    }

    // handler for get events by org
    function getEventsByOrg(req, res){
        handleRequest(res, 200, 400, service.getEventsByOrg, new ServiceParams(req))
    }

    // handler for get events by id
    function getEventById(req, res){
        handleRequest(res, 200, 400, service.getEventsById, new ServiceParams(req))
    }

    // handler for remove event
    function removeEvent(req, res){
        handleRequest(res, 200, 400, service.removeEvent, new ServiceParams(req))
    }

    // handler for interested in event
    function interestedInEvent(req, res){
        handleRequest(res, 200, 400, service.interestedInEvent, new ServiceParams(req))
    }

    // handler for participate in event
    function participateInEvent(req, res){
        handleRequest(res, 200, 400, service.participateInEvent, new ServiceParams(req))
    }

    // handler for register
    function register(req, res){
        let func;
        if (req.body.user_type === "volunteer") func = service.registerVolunteer;
        else func = service.registerOrg;

        handleRequest(res, 201, 400, func, new RegisterParams(req))
    }

    // handler for login
    function login(req, res){
        service.login(req.body)
            .then(
                (result) => {
                    req.login(new User(result.id, result.user_type), _ => handleSuccess(res, 200, {user_details: req.user}))
                }, err => handleError(res, 401, err)
            );
    }

    // handler for logout
    function logout(req, res){
        req.logout();
        handleSuccess(res, 200, {status: 'Logout completed.'})
    }

    function postImage(req, res){
        // create image object
        let image = new Image(req, true);

        // check if user can post this image
        if (!image.canPost(req.user.user_type)) return handleError(res, 401, error.unauthorizedAccess());

        // execute service call
        service.postImage(new Image(req, true))
            .then(
                () => handleSuccess(res, 200, {url: req.url})
            ).catch((err) => handleError(res, 500, err));
    }

    function getImage(req, res){
        let image = new Image(req, false);

        service.getImage(image)
            .then(image => res.end(image))
            .catch(err => handleError(res, 500, error.fileNotFound(image.type, image.id)));
    }

    // handler for unknown URL
    function unknownURI(req, res){
        handleError(res, 404, error.unknownUrl(req.originalUrl));
    }

    /**
     * Handles standard service call
     * @param res response object
     * @param statusCodeSuccess status code in case of success
     * @param statusCodeError status code in case of error
     * @param serviceFunction service function to call
     * @param serviceParams params of service function
     */
    function handleRequest(res, statusCodeSuccess, statusCodeError, serviceFunction, serviceParams){
        serviceFunction(serviceParams)
            .then(
                (result) => handleSuccess(res, statusCodeSuccess, result),
                (error) => handleError(res, statusCodeError, error)
            );
    }

    /**
     * Handles the server's response in case of success
     * @param res response object
     * @param statusCode status code
     * @param result result of the operation
     */
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

    /**
     * Handles the server's response in case of error
     * @param res response object
     * @param statusCode status code to show
     * @param error error object
     */
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

    // middleware responsible for logging the reception of a request
    function log(req, res, next){
        // date object
        let date = new Date();

        // logging
        console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()} - ${req.method} ${req.originalUrl}`);

        // passing to handler
        next();
    }

    // middleware responsible for checking if the user is authenticated
    function authenticationMw(req, res, next){
        (!(req.user || test))?
            handleError(res, 401 , error.authenticationError('User is not authenticated.')) :
            next();
    }

    // middleware responsible for checking if the user is a volunteer
    function volunteerMw(req, res, next){
        (req.user.user_type !== 'volunteer')?
            handleError(res, 401, error.authenticationError('Invalid authenticated user type.')) :
            next();
    }

    // middleware responsible for checking if the user is an org
    function orgMw(req, res, next){
        (req.user.user_type !== 'org')?
            handleError(res, 401, error.authenticationError('Invalid authenticated user type.')) :
            next();
    }

};