

module.exports = () => {

    return{
        getVolunteers: getVolunteers,
        getVolunteerById: getVolunteerById,
        followVolunteer: followVolunteer,

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
        getEventsById: getEventById,
        getEventsByOrg: getEventsFromOrg,
        removeEvent: removeEvent,

        follow: follow,
        interested: interested,
        participate: participate,

        register: register,
        authenticate: authenticate,
        remove: remove
    }

}