// error module
const error = require('./T-error')();

module.exports = (router, service) => {

    router.use('/', log);

    router.post('/user', createUser);
    router.get('/users', getUsers);
    router.delete('/user', removeUser);

    router.post('/post', createPost);
    router.get('/posts', getAllPosts);
    router.get('/posts/:id', getPostById);
    router.get('/posts/owner/:id', getPostsByOwner);

    router.use('/', unknownURI);

    function createUser(req, res){
        service.createUser(req.body.name, req.body.color)
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

    function removeUser(req, res){
        service.removeUser(req.params.name)
            .then(
                (result) => handleSuccess(res, 200, result),
                (error) => handleError(res, 400, error)
            );
    }

    function createPost(req, res){
        service.createPost(req.body.owner, req.body.body)
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