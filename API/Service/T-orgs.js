/*
    id (gerado)
    Nome
    Descrição
    followers_ids
    contato tel(opt)
    email (opt)
    link para site (opt)
    link para facebook (opt)
    link p/ imagem (futuro)
*/

const COLLECTION_NAME = 'orgs';

// Repository
const repo = require('./T-Repository')(COLLECTION_NAME);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        remove: remove
    };

    function create(org){
        return repo.insert(org);
    }

    function getAll(){
        return repo.select();
    }

    function getById(id){
        return repo.selectById(id);
    }

    function remove(id){
        return repo.removeById(id)
    }

};