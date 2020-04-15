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

    function getAll(owner_id){
        const query = {
            $query: owner_id? {$text: { $search: owner_id }}: {}
        };

        const options = {
            sort: [['time', 'desc']]
        };

        return repo.select(query, options);
    }

    function getById(id){
        return repo.selectById(id);
    }

    function update(post_id, post){
        return repo.updateById(post_id, post)
    }

    function remove(id){
        return repo.removeById(id)
    }
};