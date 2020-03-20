/*
    post id
    owner
    body (texto)
    id's de users que colocaram "like"
    link p/ imagem //not rn
*/

// dependencies
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// error module
const error = require('../T-error')();
const MODULE = 'SERVICE-POSTS';

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

    // todo: trocar nome para owner id
    function create(owner_id, body){
        const post = {
            owner_id: owner_id,
            body: body,
            likes: []
        };

        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(dbo => dbo.collection(COLLECTION_NAME))
            .then(col => col.insertOne(post))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(MODULE, COLLECTION_NAME));
                return Promise.resolve({post_id: resp.insertedId})
            });
    }

    function getAll(){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(COLLECTION_NAME))
            .then(col => col.find().toArray());
    }

    function getById(id){
        const query = {
            _id: mongo.ObjectID(id)
        };

        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(COLLECTION_NAME))
            .then(col => col.find(query).toArray());
    }

    function getByOwner(owner_id){
        const query ={
            owner: owner_id
        };

        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(COLLECTION_NAME))
            .then(col => col.find(query).toArray());
    }
};