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

    function create(_event) {
        return repo.insert(_event);
    }

    function getAll(query_options) {
        return repo.select(query_options);
    }

    function getById(query_options, id) {
        return repo.selectById(query_options, id);
    }

    function getEventsFromOrg(query_options, org_id){
        query_options.searchFor('org_id', org_id);
        return repo.select(query_options)
    }

    function update(id, _event){
        return repo.updateById(id, _event);
    }

    function remove(id) {
        return repo.removeById(id);
    }
};