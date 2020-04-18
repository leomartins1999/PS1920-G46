// external dependencies
const stringHash = require('@sindresorhus/string-hash');

// error module
const error = require('../error/T-error')();

module.exports = (users, orgs, posts, events, auth, pictures) => {

    return {
        getVolunteers: getVolunteers,
        getVolunteerById: getVolunteerById,
        follow: follow,

        createPost: createPost,
        getPosts: getPosts,
        getPostById: getPostById,
        removePost: removePost,
        likePost: likePost,

        getOrgs: getOrgs,
        getOrgById: getOrgById,
        //followOrg: followOrg,

        createEvent: createEvent,
        getEvents: getEvents,
        getEventsById: getEventById,
        getEventsByOrg: getEventsFromOrg,
        removeEvent: removeEvent,
        interestedInEvent: interestedInEvent,
        participateInEvent: participateInEvent,

        registerVolunteer: register,
        registerOrg: register,
        login: login,

        postImage: postImage,
        getImage: getImage,
    };

    /**
     * Gets volunteers
     * @param serviceParams ServiceParams object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with results
     */
    function getVolunteers(serviceParams){
        return users.getAll(serviceParams.query_options, serviceParams.name);
    }

    /**
     * Gets a specific volunteer
     * @param serviceParams ServiceParams object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with results
     */
    function getVolunteerById(serviceParams){
        if (!serviceParams.checkFor(['volunteer_id']))
            return Promise.reject(error.invalidParameters('volunteer_id'));

        return users.getById(serviceParams.query_options, serviceParams.volunteer_id);
    }

    /**
     * Operations used in function follow to update documents
     * @param type user_type
     * @returns {{get: getById, update: *}} object with get and update operations
     */
    function followOperations(type){
        return (type === 'volunteer')?
            {get: users.getById, update: users.update}:
            {get: orgs.getById, update: orgs.update};
    }

    /**
     * Executes a follow/unfollow operation. If user A already follows user B, it occurs
     * an "unfollow", occurring an "follow" otherwise. This function needs to update 2 fields
     * in separate documents and is composed form promise concatenation
     * @param followParams Follow Params Object
     * @returns {Promise<never>|PromiseLike<T>} resolves with status message if successful
     * rejects with error otherwise
     */
    function follow(followParams){
        if (!followParams.validate())
            return Promise.reject(error.serviceError('Invalid follow parameters.'));

        const followerOperations = followOperations(followParams.user_type);
        const followedOperations = followOperations(followParams.followed_type);

        return followedOperations.get(followParams.query_options, followParams.followed_id)
            .then(followed => {
                if (followed.followers[followParams.id]) delete followed.followers[followParams.id];
                else followed.followers[followParams.id] = followParams.user_type;
                return followedOperations.update(followParams.followed_id, followed);
            })
            .then((_) => followerOperations.get(followParams.query_options, followParams.id))
            .then((follower => {
                if (follower.following[followParams.followed_id]) delete follower.following[followParams.followed_id];
                else follower.following[followParams.followed_id] = followParams.followed_type;
                return followerOperations.update(followParams.id, follower)
            }))
    }

    /**
     * Get Orgs
     * @param serviceParams Service Params Object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with orgs
     */
    function getOrgs(serviceParams){
        return orgs.getAll(serviceParams.query_options, serviceParams.name);
    }

    /**
     * Get an org by its id
     * @param serviceParams Service Params Object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with org
     */
    function getOrgById(serviceParams){
        if (!serviceParams.checkFor(['org_id']))
            return Promise.reject(error.invalidParameters('org_id'));

        return orgs.getById(serviceParams.query_options, serviceParams.org_id);
    }

    /**
     * Creates a post
     * @param post Post object
     * @returns {Promise<never>|PromiseLike<{id: *}>} resolves with id if successful
     * rejects with error otherwise
     */
    function createPost(post){
        if(!post.validate())
            return Promise.reject(error.invalidParameters('owner_id, body'));

        return posts.create(post)
            .then((res => {
                if (!post.imageLink){
                    post.setId(res.id);
                    return posts.update(res.id, {imageLink: post.imageLink})
                }
                return Promise.resolve({id: post.id});
            }))
            .then(() => Promise.resolve({id: post.id}));
    }

    /**
     * Gets all posts
     * @param serviceParams ServiceParams Object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with posts
     */
    function getPosts(serviceParams){
        return posts.getAll(serviceParams.query_options, serviceParams.owner_id);
    }

    /**
     * Gets an post by its id
     * @param serviceParams ServiceParams Object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with post
     */
    function getPostById(serviceParams){
        if (!serviceParams.checkFor(['post_id']))
            return Promise.reject(error.invalidParameters('post_id'));

        return posts.getById(serviceParams.query_options, serviceParams.post_id);
    }

    /**
     * Deletes a post
     * @param serviceParams Service Params object
     * @returns {Promise<never>|PromiseLike<{id: *}>} resolves with status message if successful
     * rejects with error otherwise
     */
    function removePost(serviceParams){
        return getPostById(serviceParams)
            .then((post) => {
                if (post.owner_id !== serviceParams.user_id) return Promise.reject(error.unauthorizedAccess());
                return posts.remove(serviceParams.post_id)
            });
    }

    /**
     * Likes a post
     * @param serviceParams Service Params Object
     * @returns {Promise<T>} resolves with status message if successful
     * rejects with error otherwise
     */
    function likePost(serviceParams){
        return getPostById(serviceParams)
            .then(post => {
                if (post.likes[serviceParams.user_id]) delete post.likes[serviceParams.user_id];
                else post.likes[serviceParams.user_id] = serviceParams.user_type;
                return posts.update(serviceParams.post_id, post);
            })
    }

    /**
     * Creates an event
     * @param _event _Event Object
     * @returns {Promise<never>|PromiseLike<{id: *}>} resolves with event id if successful
     * rejects with error otherwise
     */
    function createEvent(_event){
        if (!_event.validate())
            return Promise.reject(error.invalidParameters('name, org_id, description'));

        return events.create(_event)
            .then(res => {
                if (!_event.imageLink){
                    _event.setId(res.id);
                    return events.update(res.id, {imageLink: _event.imageLink})
                }
                return Promise.resolve({id: _event.id});
            })
            .then(_ => Promise.resolve({id: _event.id}));
    }

    /**
     * Gets events
     * @param serviceParams Service Params object
     * @returns {string[] | Promise<Promise|void|any[]> | IDBRequest<any[]> | FormDataEntryValue[]} resolves with events
     */
    function getEvents(serviceParams){
        return events.getAll(serviceParams.query_options);
    }

    /**
     * Gets an event by its id
     * @param serviceParams Service Params object
     * @returns {Promise<never>|Promise<Promise|void|any[]>} resolves with event
     */
    function getEventById(serviceParams){
        if(!serviceParams.checkFor(['event_id']))
            return Promise.reject(error.invalidParameters('event_id'));

        return events.getById(serviceParams.query_options, serviceParams.event_id);
    }

    /**
     * Gets the events from a specific org
     * @param serviceParams Service Params object
     * @returns {*} resolves with events
     */
    function getEventsFromOrg(serviceParams){
        return (serviceParams.checkFor(['org_id']))?
            events.getEventsFromOrg(serviceParams.query_options, serviceParams.org_id):
            Promise.reject(error.invalidParameters('org_id'));
    }

    /**
     * Removes event
     * @param serviceParams Service Params object
     * @returns {Promise<never>|Promise<Promise | void | any[]>} resolves with status message if successful
     * rejects with error otherwise
     */
    function removeEvent(serviceParams){
        if(!serviceParams.event_id)
            return Promise.reject(error.invalidParameters('id'));

        return events
            .getById(serviceParams.query_options, serviceParams.event_id)
            .then(res => {
                if (res.org_id !== serviceParams.user_id) return Promise.reject(error.unauthorizedAccess());
                return events.remove(serviceParams.event_id);
            });
    }

    /**
     * Flags an user as interested in an event. Executed by users
     * @param serviceParams Service Params object
     * @returns {Promise<T>} resolves with status message if successful
     * rejects with error otherwise
     */
    function interestedInEvent(serviceParams){
        return getEventById(serviceParams)
            .then((_event) => {
                if (_event.participants[serviceParams.user_id]) return Promise.reject(error.serviceError("User is already a participant!"));
                if (_event.interested[serviceParams.user_id]) delete _event.interested[serviceParams.user_id];
                else _event.interested[serviceParams.user_id] = 'volunteer';
                return events.update(serviceParams.event_id, _event);
            })
    }

    /**
     * Flags an user as a participant in an event. Executed by orgs
     * @param serviceParams Service Params
     * @returns {Promise<T>} resolves with status message if successful
     * rejects with error otherwise
     */
    function participateInEvent(serviceParams){
        return getEventById(serviceParams)
            .then((_event) => {
                if (_event.org_id !== serviceParams.user_id) return Promise.reject(error.unauthorizedAccess());
                if (!_event.interested[serviceParams.volunteer_id]) return Promise.reject(error.unauthorizedAccess());
                else delete _event.interested[serviceParams.volunteer_id];
                if (_event.participants[serviceParams.volunteer_id]) delete _event.participants[serviceParams.volunteer_id];
                else _event.participants[serviceParams.volunteer_id] = 'volunteer';

                return events.update(serviceParams.event_id, _event);
            })
    }

    /**
     * Registers an user in the platform, creating its corresponding entry in the volunteers/orgs modules
     * @param registerParams RegisterParams object
     * @returns {Promise<never>|PromiseLike<T>} resolves with registration data if successful
     * rejects otherwise
     */
    function register(registerParams){
        if (!registerParams.validate())
            return Promise.reject(error.invalidParameters('email, password, user_type, data.name'));

        const createObj = (registerParams.user_type === 'volunteer')? users.create : orgs.create;

        return auth
            .get(registerParams.query_options, registerParams)
            .then(res => {
                return res ? Promise.reject(error.authenticationError('This email is already associated with a user.'))
                    : auth.register(registerParams)
            })
            .then(res => {
                registerParams.data.setId(res.id);
                return createObj(registerParams.data)
            });
    }

    /**
     * Executes the necessary verification so that a user can login in the platform
     * @param authParams Authentication Params
     * @returns {Promise<never>|PromiseLike<any>|Promise<any>} resolves with an User object if successful
     * rejects otherwise
     */
    function login(authParams){
        if (!authParams.email || !authParams.password)
            return Promise.reject(error.invalidParameters('email, password'));

        return auth
            .get(authParams.query_options, authParams)
            .then(res => {
                if(!res) return Promise.reject(error.authenticationError('The email is not associated with an account.'));
                if(res.hash !== stringHash(`${authParams.password}${res.salt}`)) return Promise.reject(error.authenticationError('The given password is incorrect.'));
                return Promise.resolve({id: res._id, user_type: res.user_type});
            });
    }

    /**
     * Stores an image in the server
     * @param image Image object
     * @returns {Promise<never>|Promise<unknown>} resolves with url if successful
     * rejects with error otherwise
     */
    function postImage(image){
        if (!image.validate(true))
            return Promise.reject(error.serviceError('No picture given!'));

        return pictures.postImage(image);
    }

    /**
     * Retrieves an image from the server
     * @param image Image Object
     * @returns {Promise<never>|Promise<unknown>} resolves with image if successful
     * rejects with error otherwise
     */
    function getImage(image){
        if (!image.validate(false))
            return Promise.reject(error.invalidParameters('id, type'));

        return pictures.getImage(image);
    }
};