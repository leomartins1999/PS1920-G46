/*
    post id
    owner
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/

// dependencies
const MongoClient = require('mongodb').MongoClient;

// constants
const URL = "mongodb://localhost:27017/";
const COLLECTION_NAME = "posts";
const DB_NAME = "tribute_db";

module.exports = () => {
    return {
        create: create,
        getAll: getAll,
        getById: getById,
        getByOwner: getByOwner
    };

    function create(owner, body){
        const post = {
            owner: owner,
            body: body,
            likes: []
        };

        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(dbo => dbo.collection(COLLECTION_NAME))
            .then(col => col.insertOne(post));
    }

    function getAll(){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(COLLECTION_NAME))
            .then(col => col.find().toArray());
    }

    function getById(){

    }

    function getByOwner(){

    }
};