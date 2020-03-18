module.exports = (router, service) => {

    router.post('/user', createUser);
    router.get('/users', getUsers);
    router.delete('/user', removeUser);

    router.use('/', unknownURI);

    function createUser(req, res){
        service.createUser(req.body.name, req.body.color)
            .then(
                (result) => res.end(JSON.stringify(result)),
                (error) => res.end(JSON.stringify(error))
            );
    }

    function getUsers(req, res){
        service.getUsers()
            .then(
                (result) => res.end(JSON.stringify(result)),
                (error) => res.end(JSON.stringify(error))
            );
    }

    function removeUser(req, res){
        service.deleteUser(req.params.name)
            .then(
                (result) => res.end(JSON.stringify(result)),
                (error) => res.end(JSON.stringify(error))
            );
    }

    function unknownURI(req, res){
        res.redirect('/', 404)
    }
};