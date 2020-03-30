// external dependencies
const stringHash = require('@sindresorhus/string-hash');

const MODULE = "Service";

// error module
const error = require('../T-error')();

module.exports = (users, orgs, posts, events, auth) => {

    return {
        getUsers: getUsers,
        getUserById: getUserById,

        createPost: createPost,
        getAllPosts: getAllPosts,
        getPostById: getPostById,
        getPostsByOwner: getPostsByOwner,
        removePost: removePost,
        likePost: likePost,

        getAllOrgs: getAllOrgs,
        getOrgById: getOrgById,

        createEvent: createEvent,
        getAllEvents: getAllEvents,
        getEventsById: getEventsById,
        getEventsByOrg: getEventsFromOrg,
        removeEvent: removeEvent,

        follow: follow,

        register: register,
        authenticate: authenticate,
        remove: remove
    };

    /*
    Users
     */

    function getUsers(){
        return users.getAll();
    }

    function getUserById(id){
        if (!id)
            return Promise.reject(error.invalidParameters('id'));

        return users.getById(id);
    }

    /*
    Posts
     */

    function createPost(post){
        if(!post.body)
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

    function removePost(id, owner_id){
        return getPostById(id)
            .then((post) => {
                if (post.owner_id !== owner_id) return Promise.reject(error.unauthorizedAccess());
                return posts.remove(id)
            });
    }

    function likePost(user_id, user_type, post_id){
        return getPostById(post_id)
            .then(post => {
                if (post.likes[user_id]) delete post.likes[user_id];
                else post.likes[user_id] = user_type;
                return posts.update(post_id, post);
            })
            .then(res => {
                if (res.status === 'updated') return Promise.resolve({status: 'success'});
                return Promise.resolve(error.serviceError('Error executing operation.'));
            })
    }

    /*
    Orgs
     */

    function getAllOrgs(){
        return orgs.getAll();
    }

    function getOrgById(id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return orgs.getById(id);
    }

    /*
    Events
     */

    function createEvent(_event){
        if (!_event.name)
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

    function removeEvent(id, org_id){
        if(!id)
            return Promise.reject(error.invalidParameters('id'));

        return events
            .getById(id)
            .then(res => {
                if (res.org_id !== org_id) return Promise.reject(error.unauthorizedAccess());
                return events.remove(id);
            });
    }

    function followOperations(type){
        return (type === 'user')?
            {get: getUserById, update: users.update}:
            {get: getOrgById, update: orgs.update};
    }

    function follow(follower_id, follower_user_type, followed_id, followed_user_type){
        if (follower_id === followed_id)
            return Promise.reject(error.serviceError('Attempting to follow self.'));

        const followerOperations = followOperations(follower_user_type);
        const followedOperations = followOperations(followed_user_type);

        return followedOperations.get(followed_id)
            .then(followed => {
                if (followed.followers[follower_id]) delete followed.followers[follower_id];
                else followed.followers[follower_id] = follower_user_type;
                return followedOperations.update(followed_id, {followers: followed.followers})
            })
            .then((_) => followerOperations.get(follower_id))
            .then((follower => {
                if (follower.following[followed_id]) delete follower.following[followed_id];
                else follower.following[followed_id] = followed_user_type;
                return followerOperations.update(follower_id, {following: follower.following})
            }))
    }

    /*
    Authentication
     */

    function register(credentials){
        if (!credentials.authDetails.email || !credentials.authDetails.password || !credentials.authDetails.user_type)
            return Promise.reject(error.invalidParameters('email, password, user_type'));

        if (!credentials.data.name)
            return Promise.reject(error.invalidParameters('name'));

        const createObj = (credentials.authDetails.user_type === 'user')? users.create : orgs.create;

        return auth
            .get(credentials.authDetails)
            .then(res => {
                return res ? Promise.reject(error.authenticationError('This email is already associated with a user.')) : auth.register(credentials.authDetails)
            })
            .then(res => {
                credentials.data.id = res.id;
                return createObj(credentials.data)
            })
    }

    function authenticate(authDetails){
        if (!authDetails.email || !authDetails.password)
            return Promise.reject(error.invalidParameters('email, password'));

        return auth
            .get(authDetails)
            .then(res => {
                if(!res) return Promise.reject(error.authenticationError('The email is not associated with an account.'));
                if(res.hash !== stringHash(`${authDetails.password}${res.salt}`)) return Promise.reject(error.authenticationError('The given password is incorrect.'));
                return Promise.resolve({authDetails: authDetails, id: res._id, user_type: res.user_type});
            });
    }

    function remove(user){
        const removeObj = (user.user_type === 'user')? users.remove : orgs.remove;

        const operations = [auth.remove(user.id), removeObj(user.id)];

        return Promise.all(operations)
    }

};