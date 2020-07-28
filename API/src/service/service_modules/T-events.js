// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'events';
const FILTER = ["description", "imageLink", "capacity", "date", "location", "interested", "participants"];
const SEARCHABLES = null;

// repository
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCHABLES);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        getEventsFromOrg: getEventsFromOrg,
        update: update,
        remove: remove
    };

    /**
     * Inserts the event in the db
     * @param _event Event Object
     * @returns {Promise<Promise>} resolves if successful, with ID
     * rejects with error otherwise
     */
    function create(_event) {
        return repo.insert(_event);
    }

    /**
     * Gets all events
     * @param query_options QueryOptions object
     * @returns {Promise<Promise|void|any[]>} resolves if successful, with Events
     * rejects with error otherwise
     */
    function getAll(query_options) {
        query_options.sortBy("date", false)

        return repo.select(query_options);
    }

    /**
     * Gets an event with a specific id
     * @param query_options Query Options object
     * @param id id of document
     * @returns {Promise<Promise|void|any[]>} resolves if successful, with Event
     * rejects with error otherwise
     */
    function getById(query_options, id) {
        return repo.selectById(query_options, id);
    }

    /**
     * Gets events from a specific org
     * @param query_options Query Options Object
     * @param org_id id of org
     * @returns {Promise<Promise|void|any[]>} resolves if successful, with Events
     * rejects with error otherwise
     */
    function getEventsFromOrg(query_options, org_id){
        query_options.searchFor('org_id', org_id);
        return repo.select(query_options)
    }

    /**
     * Updates a specific event
     * @param id id of event
     * @param _event fields to change
     * @returns {Promise<Promise>} resolves with status message if successful
     * rejects with error otherwise
     */
    function update(id, _event){
        return repo.updateById(id, _event);
    }

    /**
     * Removes an event
     * @param id id of event
     * @returns {Promise<Promise>} resolves with status message if successful
     * rejects with error otherwise
     */
    function remove(id) {
        return repo.removeById(id);
    }
};