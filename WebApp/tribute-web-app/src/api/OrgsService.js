function getOrgsService(executor){

    return{
        getOrgs: getOrgs
    }

    function getOrgs() {
        return executor.get('/orgs')
    }

}

export default getOrgsService