function getEventsService(executor){

    return{
        getEvents: getEvents
    }

    function getEvents() {
        return executor.get('/events')
    }

}

export default getEventsService