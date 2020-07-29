function getVolunteersService(executor) {

    return {
        getVolunteers: getVolunteers,
        getVolunteer: getVolunteer,
        followVolunteer: followVolunteer,
        getMail: getMail
    }

    function getVolunteers(name) {
        let link = "/volunteers"
        if (name) link = link.concat(`?name=${name}`)

        return executor.get(link)
    }

    function getVolunteer(id) {
        return executor.get(`/volunteers/${id}`)
    }

    function followVolunteer(id) {
        return executor.put(`/auth/volunteers/${id}/follow`)
    }

    function getMail(id) {
        return executor.get(`/auth/volunteers/${id}/mail`)
    }

}

export default getVolunteersService