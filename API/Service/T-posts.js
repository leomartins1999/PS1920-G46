/*
    post id
    owner
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
        getByOwner: getByOwner
    };

    function create(owner_id, body){
        const post = {
            owner_id: owner_id,
            body: body,
            likes: []
        };

        return repo.insert(post);
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

        return repo.selectById(query)
    }
};