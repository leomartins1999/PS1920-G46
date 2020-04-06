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
const FILTER = ["description", "followers", "following", "phone", "mail", "siteLink", "facebookLink", "imageLink"];

// Repository
const repo = require('./T-repository')(COLLECTION_NAME, FILTER);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    };

    function create(org){
        const obj = {
            _id: org.id,
            name: org.name,
            description: org.description,
            phone: org.phone,
            mail: org.mail,
            siteLink: org.siteLink,
            facebookLink: org.facebookLink,
            imageLink: org.imageLink,
            followers: {},
            following: {}
        };

        return repo.insert(obj);
    }

    function getAll(){
        return repo.select();
    }

    function getById(id){
        return repo.selectById(id);
    }

    function update(id, org){
        return repo.updateById(id, org)
    }

    function remove(id){
        return repo.removeById(id)
    }

};