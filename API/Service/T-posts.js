/*
    post id
    owner_id
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/

const COLLECTION_NAME = "posts";

// repo
const repo = require('./T-Repository')(COLLECTION_NAME);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        getByOwner: getByOwner,
        remove: remove
    };

    function create(post){
        const obj = {
            owner_id: post.owner_id,
            body: post.body,
            likeIds: [],
            linkImage: ''
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

    function remove(id){
        return repo.removeById(id)
    }
};