/*
    id // gerado
    Nome
    Org ID
    Body
    picture // mais tarde
    Nº pessoas
    Data
    Localização
    ids inscritos
    ids interessados
 */

// collection name
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'events';
const FILTER = ["description", "imageLink", "capacity", "date", "location", "interested", "participants"];
const SEARCHABLES = null;

// image link generator function


// repository
const repo = require('./T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCHABLES);

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

    function getAll() {
        return repo.select();
    }

    function getById(id) {
        return repo.selectById(id);
    }

    function getEventsFromOrg(org_id){
        const query = {
            org_id: org_id
        };

        return repo.select(query)
    }

    function update(id, _event){
        return repo.updateById(id, _event);
    }

    function remove(id) {
        return repo.removeById(id);
    }
};