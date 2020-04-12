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
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'volunteers';
const FILTER = ["description", "following", "followers", "linkedInLink", "imageLink"];
const SEARCH = {name: "text"};

// repository
const repo = require('./T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    }
};

function create(user) {
    const obj = {
        id: user.id,
        name: user.name,
        description: user.body,
        linkedInLink: user.linkedInLink,
        imageLink: user.imageLink,
        following: {},
        followers: {},
    };

    return repo.insert(obj);
}

function getAll(name){
    const query = name ? { $text: { $search: name }} : {};

    return repo.select(query);
}

function getById(id){
    return repo.selectById(id);
}

function update(id, user){
    return repo.updateById(id, user)
}

function remove(id){
    return repo.removeById(id);
}