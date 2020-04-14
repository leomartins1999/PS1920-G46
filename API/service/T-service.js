// external dependencies
const stringHash = require('@sindresorhus/string-hash');

const MODULE = "Service";

// error module
const error = require('../T-error')();

module.exports = (users, orgs, posts, events, auth) => {

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

        registerVolunteer: registerVolunteer,
        registerOrg: registerOrg,
        login: login
    };

    function getVolunteers(searchParams){
        return users.getAll(searchParams.name);
    }

    function getVolunteerById(searchParams){
        if (!searchParams.checkFor('volunteer_id'))
            return Promise.reject(error.invalidParameters('volunteer_id'));

        return users.getById(searchParams.volunteer_id);
    }

    //TODO: cry
    function followVolunteer(serviceParams){
        if (!serviceParams.checkFor('volunteer_id'))
            return Promise.reject(error.invalidParameters('volunteer_id'));
        follower = serviceParams.user_type === 'volunteer' ?
            getVolunteerById(new ServiceParams({params: {volunteer_id: serviceParams.id}})) :
            getOrgById(new ServiceParams({params: {org_id: serviceParams.id}}));
        return getVolunteerById(serviceParams)
            .then(volunteer => {
                if (volunteer.followers[serviceParams.id]) {
                    delete volunteer.followers[serviceParams.id];
                    delete follower.following[serviceParams.volunteer_id];
                }
                else {
                    volunteer.followers[serviceParams.id] = serviceParams.user_type;
                    follower.following[serviceParams.volunteer_id] = 'volunteer';
                }
                users.update(serviceParams.volunteer_id, volunteer);
                serviceParams.user_type === 'volunteer' ?
                    users.update(serviceParams.id, follower) :
                    orgs.update(serviceParams.id, follower);
            })
    }

    function createPost(post){
        if(!post.validate())
            return Promise.reject(error.invalidParameters('owner_id, body'));

        return posts.create(post);
    }

    function getPosts(searchParams){
        return posts.getAll(searchParams.owner_id);
    }

    function getPostById(searchParams){
        if (!searchParams.checkFor('post_id'))
            return Promise.reject(error.invalidParameters('post_id'));

        return posts.getById(searchParams.post_id);
    }

    function removePost(id, owner_id){
        return getPostById(id)
            .then((post) => {
                if (post.owner_id !== owner_id) return Promise.reject(error.unauthorizedAccess());
                return posts.remove(id)
            });
    }

    function likePost(serviceParams){
        return getPostById(serviceParams)
            .then(post => {
                if (post.likes[serviceParams.id]) delete post.likes[serviceParams.id];
                else post.likes[serviceParams.id] = serviceParams.user_type;
                return posts.update(serviceParams.post_id, post);
            })
            .then(res => {
                if (res.status === 'updated') return Promise.resolve({status: 'success'});
                return Promise.resolve(error.serviceError('Error executing operation.'));
            })
    }

    /*
    Orgs
     */

    function getOrgs(searchParams){
        return orgs.getAll(searchParams.name);
    }

    function getOrgById(searchParams){
        if (!searchParams.checkFor('org_id'))
            return Promise.reject(error.invalidParameters('org_id'));

        return orgs.getById(searchParams.org_id);
    }

    /*
    Events
     */

    function createEvent(_event){
        if (!_event.validate())
            return Promise.reject(error.invalidParameters('name, org_id, description'));

        return events.create(_event)
    }

    function getEvents(){
        return events.getAll();
    }

    function getEventById(searchParams){
        if(!searchParams.checkFor('event_id'))
            return Promise.reject(error.invalidParameters('event_id'));

        return events.getById(searchParams.event_id);
    }

    function getEventsFromOrg(searchParams){
        return (searchParams.checkFor('org_id'))?
            events.getEventsFromOrg(searchParams.org_id):
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

    function interestedInEvent(searchParams){
        return getEventById(searchParams)
            .then((_event) => {
                if (_event.participants[searchParams.id]) return Promise.reject(error.serviceError("User is already a participant!"));
                if (_event.interested[searchParams.id]) delete _event.interested[searchParams.id];
                else _event.interested[searchParams.id] = 'volunteer';
                return events.update(searchParams.event_id, _event);
            })
    }

    function participateInEvent(searchParams){
        return getEventById(searchParams)
            .then((_event) => {
                if (_event.org_id !== searchParams.id) return Promise.reject(error.unauthorizedAccess());
                if (_event.interested[searchParams.volunteer_id]) delete _event.interested[searchParams.volunteer_id];
                if (_event.participants[searchParams.volunteer_id]) delete _event.participants[searchParams.volunteer_id];
                else _event.participants[searchParams.volunteer_id] = 'volunteer';

                return events.update(searchParams.event_id, _event);
            })
    }

    /*
    Authentication
     */

    function registerVolunteer(registerParams){
        if (registerParams.checkFor(['email', 'password', 'user_type', 'data.name']))
            return Promise.reject(error.invalidParameters('email, password, user_type, data.name'));

        //
        //
        // if (!credentials.data.name)
        //     return Promise.reject(error.invalidParameters('name'));

        const createObj = (registerParams.user_type === 'volunteer')? users.create : orgs.create;

        return auth
            .get(registerParams)
            .then(res => {
                return res ? Promise.reject(error.authenticationError('This email is already associated with a user.')) : auth.register(registerParams)
            })
            .then(res => {
                registerParams.data.id = res.id;
                return createObj(registerParams.data)
            })
    }

    function registerOrg(registerParams){}

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

};