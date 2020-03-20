// dependencies
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// error module
const error = require('../T-error')();
const MODULE = 'SERVICE-POSTS';

// constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "tribute_db";

module.exports = (collection) => {
    return {
        insert: insert,
        select: select,
        selectById: selectById,
        remove: remove,
        removeById: removeById
    };

    function insert(obj){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(dbo => dbo.collection(collection))
            .then(col => col.insertOne(obj))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(MODULE, collection));
                return Promise.resolve({id: resp.insertedId})
            });
    }

    function select(query){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(collection))
            .then(col => col.find(query).toArray());
    }

    function selectById(id){
        const query = {
            _id: mongo.ObjectID(id)
        };

        return select(query);
    }

    function remove(query){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(db => db.collection(collection))
            .then(col => col.removeMany(query).toArray());
    }

    function removeById(id) {
        const query = {
            _id: mongo.ObjectID(id)
        };

        return remove(query);
    }
};