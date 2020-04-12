module.exports = () => {

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

    function getVolunteers(serviceParams) {
        return resolve({name: serviceParams.name})
    }

    function getVolunteerById(serviceParams) {
        if (!serviceParams.checkFor('volunteer_id'))
            return reject();

        return resolve({_id: serviceParams.volunteer_id});
    }

    function followVolunteer(serviceParams) {
        if (!serviceParams.checkFor('volunteer_id'))
            return reject();

        return resolve();
    }

    function createPost(post) {
        if(!post.validate())
            return reject();

        return resolve()
    }

    function getPosts(serviceParams) {
        return resolve({owner_id: serviceParams.owner_id})
    }

    function getPostById(serviceParams) {
        if (!serviceParams.checkFor('post_id'))
            return reject();

        return resolve({_id: serviceParams.post_id})
    }

    function removePost(serviceParams) {
        if (!serviceParams.checkFor('post_id'))
            return reject();

        return resolve();
    }

    function likePost(serviceParams) {
        if (!serviceParams.checkFor('post_id'))
            return reject();

        return resolve()
    }

    function getOrgs(serviceParams) {
        return resolve({name: serviceParams.name})
    }

    function getOrgById(serviceParams) {
        if (!serviceParams.checkFor('org_id'))
            return reject();

        return resolve({_id: serviceParams.org_id});
    }

    function createEvent(_event) {
        if(!post.validate())
            return reject();

        return resolve({_id: 1});
    }

    function getEvents(serviceParams) {
        return resolve();
    }

    function getEventById(serviceParams) {
        if (!serviceParams.checkFor('event_id'))
            return reject();

        return resolve({_id: serviceParams.event_id, org_id: serviceParams.org_id});
    }

    function getEventsFromOrg(serviceParams) {
        if (!serviceParams.checkFor('org_id'))
            return reject();

        return resolve({org_id: serviceParams.org_id});
    }

    function removeEvent(serviceParams) {
        if (!serviceParams.checkFor('event_id'))
            return reject();

        return resolve();
    }

    function interestedInEvent(serviceParams) {
        if (!serviceParams.checkFor('event_id') && serviceParams.checkFor('id'))
            return reject();

        return resolve();
    }

    function participateInEvent(serviceParams) {
        if (!serviceParams.checkFor('event_id') && serviceParams.checkFor('id'))
            return reject();

        return resolve();
    }

    function registerVolunteer(registerParams) {
        if (!registerParams.validate())
            return reject();

        return resolve({user_type: "volunteer"});
    }

    function registerOrg(registerParams) {
        if (!registerParams.validate())
            return reject();

        return resolve({user_type: "org"});
    }

    function login(serviceParams) {
        return resolve();
    }

    function resolve(obj){
        return Promise.resolve(obj);
    }

    function reject(obj){
        return Promise.reject(obj);
    }
};