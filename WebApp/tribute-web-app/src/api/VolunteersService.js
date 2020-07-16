function getVolunteersService(executor){

    return{
        getVolunteers: getVolunteers,
        getVolunteer: getVolunteer
    }

    function getVolunteers() {
        return executor.get('/volunteers')
    }

    function getVolunteer(id){
        return executor.get(`/volunteers/${id}`)
    }

}

export default getVolunteersService