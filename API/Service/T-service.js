// error module
const error = require('../T-error')();

module.exports = (users, orgs, posts, events) => {

    return {
        createUser: createUser,
        getUsers: getUsers,
        getUserById: getUserById,
        removeUser: removeUser,

        createPost: createPost,
        getAllPosts: getAllPosts,
        getPostById: getPostById,
        getPostsByOwner: getPostsByOwner,
        removePost: removePost,

        createOrg: createOrg,
        getAllOrgs: getAllOrgs,
        getOrgById: getOrgById,
        removeOrg: removeOrg,

        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getEventsById: getEventsById,
        getEventsByOrg: getEventsFromOrg,
        removeEvent: removeEvent
    };

    /*
    Users
     */

    function createUser(user){
        if(!user.name)
            return Promise.reject(error.invalidParameters('name'));

        return users.create(user);
    }

    function getUsers(){
        return users.getAll();
    }

    function getUserById(id){
        if (!id)
            return Promise.reject(error.invalidParameters('id'));

        return users.getById(id);
    }

    function removeUser(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return users.remove(id);
    }

    /*
    Posts
     */

    function createPost(post){
        if(!post.owner_id || !post.body)
            return Promise.reject(error.invalidParameters('owner_id, body'));

        return posts.create(post);
    }

    function getAllPosts(){
        return posts.getAll();
    }

    function getPostById(post_id){
        if (!post_id)
            return Promise.reject(error.invalidParameters('post_id'));

        return posts.getById(post_id);
    }

    function getPostsByOwner(owner_id){
        if (!owner_id)
            return Promise.reject(error.invalidParameters('id'));

        return posts.getByOwner(owner_id);
    }

    function removePost(id){
        if (!id)
            return Promise.reject(error.invalidParameters('id'))

        return posts.remove(id);
    }

    /*
    Orgs
     */

    function createOrg(org){
        if (!org.name)
            return Promise.reject(error.invalidParameters('name'));

        return orgs.create(org)
    }

    function getAllOrgs(){
        return orgs.getAll();
    }

    function getOrgById(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return orgs.getById(id);
    }

    function removeOrg(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return orgs.remove(id);
    }

    /*
    Events
     */

    function createEvent(_event){
        if (!_event.name || !_event.org_id)
            return Promise.reject(error.invalidParameters('name, org_id'));

        return events.create(_event)
    }

    function getAllEvents(){
        return events.getAll();
    }

    function getEventsById(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return events.getById(id);
    }

    function getEventsFromOrg(org_id){
        return (org_id)?
            events.getEventsFromOrg(org_id):
            Promise.reject(error.invalidParameters('org_id'));
    }

    function removeEvent(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return events.remove(id);
    }

};