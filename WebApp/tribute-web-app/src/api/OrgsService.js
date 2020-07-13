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

    function updateOrgImage(id, image) {
        return executor.uploadImage(`/auth/images/orgs/${id}`, image)
    }
}

export default getOrgsService