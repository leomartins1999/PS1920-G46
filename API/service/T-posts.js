/*
    post id
    owner_id
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/

const COLLECTION_NAME = "posts";
const FILTER = ["description", "likes", "imageLink"];
const SEARCH = {owner_id: "text"};

// repo
const repo = require('./T-repository')(COLLECTION_NAME, FILTER, SEARCH);

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
        const obj = {
            owner_id: post.owner_id,
            description: post.description,
            likes: {},
            imageLink: post.imageLink
        };

        return repo.insert(obj);
    }

    function getAll(){
        return repo.select()
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