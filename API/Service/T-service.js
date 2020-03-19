module.exports = (users, orgs, posts, events) => {

    return {
        createUser: createUser,
        getUsers: getUsers,
        removeUser: removeUser,

        createPost: createPost,
        getAllPosts: getAllPosts
    };

    function createUser(name, color){
        if(!name)
            return Promise.reject("fuck off");

        return users.create(name, color)
    }

    function getUsers(){
        return users.getAll()
    }

    function removeUser(name){
        if(!name)
            return Promise.reject("fuck off");

        return users.remove(name)
    }

    function createPost(owner, body){
        if(!owner || !body)
            return Promise.reject("fuck off");

        return posts.create(owner, body)
    }

    function getAllPosts(){
        return posts.getAll()
    }

};