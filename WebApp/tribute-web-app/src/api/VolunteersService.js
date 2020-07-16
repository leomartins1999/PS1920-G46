function getVolunteersService(executor){

    return{
        getVolunteers: getVolunteers,
        getVolunteer: getVolunteer,
        followVolunteer: followVolunteer
    }

    function getVolunteers() {
        return executor.get('/volunteers')
    }

    function getVolunteer(id){
        return executor.get(`/volunteers/${id}`)
    }

    function followVolunteer(id) {
        return executor.put(`/auth/volunteers/${id}/follow`)
    }

}

export default getVolunteersService