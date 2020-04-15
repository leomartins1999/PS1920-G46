/*
    post id
    owner_id
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = "posts";
const FILTER = ["description", "likes", "imageLink"];
const SEARCH = {owner_id: "text"};

// repo
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        getByOwner: getByOwner,
        update: update,
        remove: remove
    };

    function create(post){
        return repo.insert(post);
    }

    function getAll(owner_id){
        const query = owner_id ? { $text: { $search: owner_id }} : {};

        return repo.select(query);
    }

    function getById(id){
        return repo.selectById(id);
    }

    function getByOwner(owner_id){
        const query = {
            owner_id: owner_id
        };

        return repo.select(query)
    }

    function update(post_id, post){
        return repo.updateById(post_id, post)
    }

    function remove(id){
        return repo.removeById(id)
    }
};