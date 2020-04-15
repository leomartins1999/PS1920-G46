// repository fields
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'orgs';
const FILTER = ["description", "followers", "following", "phone", "mail", "siteLink", "facebookLink", "imageLink"];
const SEARCH = {name: "text"};

// Repository
const repo = require('../repository/T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    };

    function create(org){
        return repo.insert(org);
    }

    function getAll(query_options, org_name){
        if (org_name) query_options.similarTo(org_name);

        return repo.select(query_options);
    }

    function getById(query_options, id){
        return repo.selectById(query_options, id);
    }

    function update(id, org){
        return repo.updateById(id, org)
    }

    function remove(id){
        return repo.removeById(id)
    }

};