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

function create(volunteer) {
    return repo.insert(volunteer);
}

function getAll(query_options, name){
    if (name) query_options.similarTo(name);

    return repo.select(query_options);
}

function getById(query_options, id){
    return repo.selectById(query_options, id);
}

function update(id, user){
    return repo.updateById(id, user)
}

function remove(id){
    return repo.removeById(id);
}