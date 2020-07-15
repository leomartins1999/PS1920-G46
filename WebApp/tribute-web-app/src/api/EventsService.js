function getEventsService(executor){

    return{
        createEvent: createEvent,
        getEvents: getEvents,
        updateEventImage: updateEventImage
    }

    function createEvent(event){
        return executor.post(`/auth/orgs/events`, event)
    }

    function getEvents(id) {
        return executor.get(
            id ? `/orgs/${id}/events` : "/events"
        )
    }

    function updateEventImage(id, image) {
        return executor.uploadImage(`/auth/images/events/${id}`, image)
    }

}

export default getEventsService