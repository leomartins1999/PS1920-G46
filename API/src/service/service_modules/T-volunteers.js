/// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'volunteers';
const FILTER = ["description", "following", "followers", "linkedInLink", "imageLink"];
const SEARCH = {name: "text"};

// repository
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    }
};

/**
 * Creates a volunteer
 * @param volunteer Volunteer Object
 * @returns {Promise<Promise>} resolves with id if successful
 * rejects with error otherwise
 */
function create(volunteer) {
    return repo.insert(volunteer);
}

/**
 * Gets all volunteers
 * @param query_options Query Options object
 * @param name (optional) name of volunteer to search for
 * @returns {Promise<Promise|void|any[]>} resolves with id if successful
 * rejects with error otherwise
 */
function getAll(query_options, name){
    if (name) query_options.similarTo(name);

    return repo.select(query_options);
}

/**
 * Gets a specific volunteer
 * @param query_options Query Options object
 * @param id id of volunteer
 * @returns {Promise<Promise|void|any[]>} resolves with id if successful
 * rejects with error otherwise
 */
function getById(query_options, id){
    return repo.selectById(query_options, id);
}

/**
 * Updates a volunteer
 * @param id id of volunteer
 * @param user fields to be updated to
 * @returns {Promise<Promise>} resolves with status message if successful
 * rejects with error otherwise
 */
function update(id, user){
    return repo.updateById(id, user)
}

/**
 * Removes a volunteer
 * @param id id of volunteer
 * @returns {Promise<Promise>} resolves with status message if successful
 * rejects with error otherwise
 */
function remove(id){
    return repo.removeById(id);
}