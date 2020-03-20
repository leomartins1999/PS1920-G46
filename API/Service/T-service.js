// error module
const error = require('../T-error')();

module.exports = (users, orgs, posts, events) => {

    return {
        createUser: createUser,
        getUsers: getUsers,
        removeUser: removeUser,

        createPost: createPost,
        getAllPosts: getAllPosts,
        getPostById: getPostById,
        getPostsByOwner: getPostsByOwner
    };

    function createUser(name, color){
        if(!name)
            return Promise.reject(error.invalidParameter('name'));

        return users.create(name, color);
    }

    function getUsers(){
        return users.getAll();
    }

    function removeUser(name){
        if(!name)
            return Promise.reject(error.invalidParameter('name'));

        return users.remove(name);
    }

    function createPost(owner_id, body){
        if(!owner_id || !body)
            return Promise.reject(error.invalidParameter('owner_id, body'));

        return posts.create(owner_id, body);
    }

    function getAllPosts(){
        return posts.getAll();
    }

    function getPostById(post_id){
        if (!post_id)
            return Promise.reject(error.invalidParameter('post_id'));

        return posts.getById(post_id);
    }

    function getPostsByOwner(owner_id){
        return posts.getByOwner(owner_id);
    }

};