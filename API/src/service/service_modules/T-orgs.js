// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'orgs';
const FILTER = ["description", "followers", "following", "phone", "mail", "siteLink", "facebookLink", "imageLink"];
const SEARCH = {name: "text"};

// Repository
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    };

    /**
     * Creates an org
     * @param org Org object
     * @returns {Promise<Promise>} resolves if successful, with ID
     * rejects otherwise with error
     */
    function create(org){
        return repo.insert(org);
    }

    /**
     * Gets all orgs
     * @param query_options Query Options Object
     * @param org_name (optional) similar name of org
     * @returns {Promise<Promise|void|any[]>} resolves if successful, with results
     * rejects otherwise with error
     */
    function getAll(query_options, org_name){
        if (org_name) query_options.similarTo(org_name);

        return repo.select(query_options);
    }

    /**
     * Gets an org by its ID
     * @param query_options Query Options Object
     * @param id id of org
     * @returns {Promise<Promise|void|any[]>} resolves if successful, with result
     * rejects otherwise with error
     */
    function getById(query_options, id){
        return repo.selectById(query_options, id);
    }

    /**
     * Updates an org
     * @param id id of org
     * @param org fields to be updated
     * @returns {Promise<Promise>} resolves if successful, with status message
     * rejects otherwise with error
     */
    function update(id, org){
        return repo.updateById(id, org)
    }

    /**
     * Removes an org
     * @param id id of org
     * @returns {Promise<Promise>} resolves if successful, with status message
     * rejects otherwise with error
     */
    function remove(id){
        return repo.removeById(id)
    }

};