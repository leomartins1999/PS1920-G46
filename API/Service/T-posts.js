/*
    post id
    owner_id
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/

const COLLECTION_NAME = "posts";

// repo
const repo = require('./T-repository')(COLLECTION_NAME);

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
            body: post.body,
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
        const obj = {
            body: post.body,
            likes: post.likes,
            imageLink: post.imageLink
        };

        return repo.update({_id: post_id}, obj);
    }

    function remove(id){
        return repo.removeById(id)
    }
};