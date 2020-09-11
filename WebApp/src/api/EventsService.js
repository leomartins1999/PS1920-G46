function getEventsService(executor){

    return{
        createEvent: createEvent,
        getEvents: getEvents,
        getEvent: getEvent,
        updateEvent: updateEvent,
        updateEventImage: updateEventImage
    }

    function createEvent(event){
        return executor.post(`/auth/events`, event)
    }

    function getEvents(org_id) {
        return executor.get(
            org_id ? `/auth/events` : '/events'
        )
    }

    function getEvent(event_id) {
        return executor.get(`/events/${event_id}`)
    }

    function updateEvent(event_id, body) {
        return executor.put(`/auth/events/${event_id}`, body)
    }

    function updateEventImage(id, image) {
        return executor.uploadImage(`/auth/images/events/${id}`, image)
    }

}

export default getEventsService