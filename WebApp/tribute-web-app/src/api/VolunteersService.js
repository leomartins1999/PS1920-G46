function getVolunteersService(executor){

    return{
        getVolunteers: getVolunteers,
        getVolunteer: getVolunteer,
        followVolunteer: followVolunteer
    }

    function getVolunteers(name) {
        let link = "/volunteers"
        if(name) link = link.concat(`?name=${name}`)

        return executor.get(link)
    }

    function getVolunteer(id){
        return executor.get(`/volunteers/${id}`)
    }

    function followVolunteer(id) {
        return executor.put(`/auth/volunteers/${id}/follow`)
    }

}

export default getVolunteersService