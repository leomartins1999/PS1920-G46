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
const repo = require('./T-repository')(COLLECTION_NAME);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        remove: remove
    };

    function create(org){
        const obj = {
            name: org.name,
            body: org.body,
            followers: [],
            phone: org.phone,
            mail: org.mail,
            linkSite: org.linkSite,
            linkFacebook: org.linkFacebook,
            linkImage: ''
        };

        return repo.insert(obj);
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