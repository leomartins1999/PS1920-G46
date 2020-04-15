// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = "posts";
const FILTER = ["description", "likes", "imageLink"];
const SEARCH = {owner_id: "text"};

// repository
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    };

    function create(post){
        return repo.insert(post);
    }

    function getAll(query_options, owner_id){
        if (owner_id) query_options.searchFor('owner_id', owner_id);
        query_options.sortBy('time', false);

        return repo.select(query_options);
    }

    function getById(query_options, id){
        return repo.selectById(query_options, id);
    }

    function update(post_id, post){
        return repo.updateById(post_id, post)
    }

    function remove(id){
        return repo.removeById(id)
    }
};