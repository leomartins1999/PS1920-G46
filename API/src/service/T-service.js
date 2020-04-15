// external dependencies
const stringHash = require('@sindresorhus/string-hash');

const MODULE = "Service";

// error module
const error = require('../error/T-error')();

module.exports = (users, orgs, posts, events, auth, pictures) => {

    return {
        getVolunteers: getVolunteers,
        getVolunteerById: getVolunteerById,
        followVolunteer: followVolunteer,

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

    function getVolunteers(serviceParams){
        if (serviceParams.checkFor('name'))
            serviceParams.query_options.searchByValue(serviceParams.name);

        return users.getAll(serviceParams.query_options);
    }

    function getVolunteerById(serviceParams){
        if (!serviceParams.checkFor(['volunteer_id']))
            return Promise.reject(error.invalidParameters('volunteer_id'));

        return users.getById(serviceParams.volunteer_id);
    }

    function followOperations(type){
        return (type === 'user')?
            {get: users.getById, update: users.update}:
            {get: orgs.getById, update: orgs.update};
    }
    function followVolunteer(followParams){
        if (followParams.validate())
            return Promise.reject(error.serviceError('Invalid follow parameters.'));
        const followerOperations = followOperations(followParams.user_type);
        const followedOperations = followOperations(followParams.followed_type);
        return followedOperations.get(followParams.followed_id)
            .then(followed => {
                if (followed.followers[followParams.id]) delete followed.followers[followParams.id];
                else followed.followers[followParams.id] = followParams.user_type;
                return followedOperations.update(followParams.id, {followers: followed.followers})
            })
            .then((_) => followerOperations.get(followParams.id))
            .then((follower => {
                if (follower.following[followParams.followed_id]) delete follower.following[followParams.followed_id];
                else follower.following[followParams.followed_id] = followParams.followed_type;
                return followerOperations.update(followParams.id, {following: follower.following})
            }))
    }

    function getOrgs(serviceParams){
        return orgs.getAll(serviceParams.name);
    }

    function getOrgById(serviceParams){
        if (!serviceParams.checkFor(['org_id']))
            return Promise.reject(error.invalidParameters('org_id'));

        return orgs.getById(serviceParams.org_id);
    }

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

    function getPosts(serviceParams){
        return posts.getAll(serviceParams.owner_id);
    }

    function getPostById(serviceParams){
        if (!serviceParams.checkFor(['post_id']))
            return Promise.reject(error.invalidParameters('post_id'));

        return posts.getById(serviceParams.post_id);
    }

    function removePost(serviceParams){
        return getPostById(serviceParams)
            .then((post) => {
                if (post.owner_id !== serviceParams.user_id) return Promise.reject(error.unauthorizedAccess());
                return posts.remove(serviceParams.post_id)
            });
    }

    function likePost(serviceParams){
        return getPostById(serviceParams)
            .then(post => {
                if (post.likes[serviceParams.user_id]) delete post.likes[serviceParams.user_id];
                else post.likes[serviceParams.user_id] = serviceParams.user_type;
                return posts.update(serviceParams.post_id, post);
            })
    }

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

    function getEvents(){
        return events.getAll();
    }

    function getEventById(serviceParams){
        if(!serviceParams.checkFor(['event_id']))
            return Promise.reject(error.invalidParameters('event_id'));

        return events.getById(serviceParams.event_id);
    }

    function getEventsFromOrg(serviceParams){
        return (serviceParams.checkFor(['org_id']))?
            events.getEventsFromOrg(serviceParams.org_id):
            Promise.reject(error.invalidParameters('org_id'));
    }

    function removeEvent(serviceParams){
        if(!serviceParams.event_id)
            return Promise.reject(error.invalidParameters('id'));

        return events
            .getById(serviceParams.event_id)
            .then(res => {
                if (res.org_id !== serviceParams.user_id) return Promise.reject(error.unauthorizedAccess());
                return events.remove(serviceParams.event_id);
            });
    }

    function interestedInEvent(serviceParams){
        return getEventById(serviceParams)
            .then((_event) => {
                if (_event.participants[serviceParams.user_id]) return Promise.reject(error.serviceError("User is already a participant!"));
                if (_event.interested[serviceParams.user_id]) delete _event.interested[serviceParams.user_id];
                else _event.interested[serviceParams.user_id] = 'volunteer';
                return events.update(serviceParams.event_id, _event);
            })
    }

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

    function register(registerParams){
        if (!registerParams.validate())
            return Promise.reject(error.invalidParameters('email, password, user_type, data.name'));

        const createObj = (registerParams.user_type === 'volunteer')? users.create : orgs.create;

        return auth
            .get(registerParams)
            .then(res => {
                return res ? Promise.reject(error.authenticationError('This email is already associated with a user.'))
                    : auth.register(registerParams)
            })
            .then(res => {
                registerParams.data.setId(res.id);
                return createObj(registerParams.data)
            });
    }

    function login(authDetails){
        if (!authDetails.email || !authDetails.password)
            return Promise.reject(error.invalidParameters('email, password'));

        return auth
            .get(authDetails)
            .then(res => {
                if(!res) return Promise.reject(error.authenticationError('The email is not associated with an account.'));
                if(res.hash !== stringHash(`${authDetails.password}${res.salt}`)) return Promise.reject(error.authenticationError('The given password is incorrect.'));
                return Promise.resolve({id: res._id, user_type: res.user_type});
            });
    }

    function remove(user){
        const removeObj = (user.user_type === 'user')? users.remove : orgs.remove;

        const operations = [auth.remove(user.id), removeObj(user.id)];

        return Promise.all(operations)
    }

    function postImage(image){
        if (!image.validate(true))
            return Promise.reject(error.serviceError('No picture found!'));

        return pictures.postImage(image);
    }

    function getImage(image){
        if (!image.validate(false))
            return Promise.reject(error.invalidParameters('id', 'type'));

        return pictures.getImage(image);
    }
};