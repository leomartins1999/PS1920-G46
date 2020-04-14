const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'orgs';
const FILTER = ["description", "followers", "following", "phone", "mail", "siteLink", "facebookLink", "imageLink"];
const SEARCH = {name: "text"};

// image link generator function
const imageLink = (id) => `/images/volunteers/${id}`;

// Repository
const repo = require('./T-repository')(DB_NAME, COLLECTION_NAME, FILTER, SEARCH);

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        update: update,
        remove: remove
    };

    function create(org, id){
        // adding additional properties
        org._id = id;
        org.imageLink = imageLink(id);
        org.followers = {};
        org.following = {};

        return repo.insert(org);
    }

    function getAll(name){
        const query = name ? { $text: { $search: name }} : {};

        return repo.select(query);
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