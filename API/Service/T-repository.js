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
        update: update,
        remove: remove,
        removeById: removeById
    };

    function accessCollection(){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(dbo => dbo.collection(collection));
    }

    function insert(obj){
        generateId(obj);

        return accessCollection()
            .then(col => col.insertOne(obj))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(collection, 'insert'));
                return Promise.resolve({id: resp.insertedId})
            });
    }

    function select(query){
        generateId(query);

        return accessCollection()
            .then(col => col.find(query).toArray());
    }

    function selectById(id){
        const query = {
            _id: id
        };

        return select(query)
            .then(res => res[0]);
    }

    function update(query, update){
        generateId(query);

        return accessCollection()
            .then(col => col.update(query, update))
            .then(res => {
                if (res.matchedCount === 0) return Promise.reject(error.databaseError(collection, 'update'));
                return Promise.resolve({status: 'updated'})
            })
    }

    function remove(query){
        generateId(query);

        return accessCollection()
            .then(col => col.deleteMany(query))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(collection, 'delete'));
                return Promise.resolve({status: 'deleted', id: query._id})
            });
    }

    function removeById(id) {
        const query = {
            _id: id
        };

        return remove(query);
    }

    function generateId(obj){
        if(!obj || !obj._id) return;

        if(!mongo.ObjectID.isValid(obj._id))
            return Promise.reject(error.invalidParameters('id'));

        obj._id = mongo.ObjectID(obj._id)
    }
};