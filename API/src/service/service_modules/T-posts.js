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

    /**
     * Creates a post
     * @param post Post object
     * @returns {Promise<Promise>} resolves with ID if successful
     * rejects with error otherwise
     */
    function create(post){
        return repo.insert(post);
    }

    /**
     * Gets all posts, ordered by most recent ones
     * @param query_options Query Options object
     * @param owner_id (optional) select posts by owner id
     * @returns {Promise<Promise|void|any[]>} resolves with results of successful
     * rejects with error otherwise
     */
    function getAll(query_options, owner_id){
        if (owner_id) query_options.searchFor('owner_id', owner_id);
        query_options.sortBy('time', false);

        return repo.select(query_options);
    }

    /**
     * Gets a specific post
     * @param query_options Query Options object
     * @param id id of post
     * @returns {Promise<Promise|void|any[]>} resolves with result, if successful
     * rejects with error otherwise
     */
    function getById(query_options, id){
        return repo.selectById(query_options, id);
    }

    /**
     * Updates a post
     * @param post_id post's id
     * @param post fields to be updated
     * @returns {Promise<Promise>} resolves with status message, if successful
     * rejects with error otherwise
     */
    function update(post_id, post){
        return repo.updateById(post_id, post)
    }

    /**
     * Removes a post
     * @param id post id
     * @returns {Promise<Promise>} resolves with status message, if successful
     * rejects with error otherwise
     */
    function remove(id){
        return repo.removeById(id)
    }
};