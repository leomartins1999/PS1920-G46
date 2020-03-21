/*
  id // gerado
  Name
  Descricao
  ids a que da follow
  ids dos followers
  link p/ linkedin
  Profile pic // mais tarde
 */

// collection name
const COLLECTION_NAME = 'users';

// repository
const repo = require('./T-Repository')(COLLECTION_NAME);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        remove: remove
    }
};

function create(user) {
    return repo.insert(user);
}

function getAll(){
    return repo.select();
}

function getById(id){
    return repo.selectById(id);
}

function remove(id){
    return repo.removeById(id);
}