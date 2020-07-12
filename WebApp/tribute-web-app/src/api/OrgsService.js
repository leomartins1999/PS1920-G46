function getOrgsService(executor) {

    return {
        getOrgs: getOrgs,
        getOrg: getOrg,
        updateOrg: updateOrg,
        updateOrgImage: updateOrgImage
    }

    function getOrgs() {
        return executor.get('/orgs')
    }

    function getOrg(id) {
        return executor.get(`/orgs/${id}`)
    }

    function updateOrg(id, params) {
        return executor.put(`/auth/orgs/${id}`, params)
    }

    function updateOrgImage(id, file) {
        return executor.uploadImage(`/auth/images/orgs/${id}`, file)
    }
}

export default getOrgsService