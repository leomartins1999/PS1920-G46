function getVolunteersService(executor){

    return{
        getVolunteers: getVolunteers
    }

    function getVolunteers() {
        return executor.get('/volunteers')
    }

}

export default getVolunteersService