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
const COLLECTION_NAME = 'events';
const FILTER = ["body", "imageLink", "capacity", "date", "location", "interestedIds", "participantIds"];

// repository
const repo = require('./T-repository')(COLLECTION_NAME, FILTER);

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
        const obj = {
            name: _event.name,
            org_id: _event.org_id,
            body: _event.body,
            imageLink: '',
            capacity: _event.capacity,
            date: _event.date,
            location: _event.location,
            interestedIds: [],
            participantIds: []
        };

        return repo.insert(obj);
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