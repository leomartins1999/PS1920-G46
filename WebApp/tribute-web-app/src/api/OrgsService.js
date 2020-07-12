function getOrgsService(executor){

    return{
        getOrgs: getOrgs,
        updateOrg: updateOrg,
        getOrg: getOrg
    }

    function getOrgs() {
        return executor.get('/orgs')
    }

    function updateOrg(id, params){
        return executor.put(`/auth/orgs/${id}`, params)
    }

    function getOrg(id){
        return executor.get(`/orgs/${id}`)
    }

}

export default getOrgsService