// dependencies
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// error module
const error = require('../T-error')();
const MODULE = 'SERVICE-POSTS';

// constants
const URL = "mongodb://localhost:27017/";
const DB_NAME = "tribute_db";

module.exports = (collection, filter, searchables) => {
    if(searchables) createSearchIdx(searchables);

    return {
        insert: insert,
        select: select,
        selectById: selectById,
        update: update,
        updateById: updateById,
        remove: remove,
        removeById: removeById
    };

    function accessCollection(){
        return MongoClient.connect(URL)
            .then(db => db.db(DB_NAME))
            .then(dbo => dbo.collection(collection));
    }

    function createSearchIdx(searchables) {
        accessCollection().createIndex(searchables);
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
            id: id
        };

        return select(query)
            .then(res => res[0]);
    }

    function update(query, obj){
        const update = {'$set': filterProperties(obj)};

        generateId(query);

        return accessCollection()
            .then(col => col.updateOne(query, update))
            .then(res => {
                if (res.matchedCount === 0) return Promise.reject(error.databaseError(collection, 'update'));
                return Promise.resolve({status: 'updated'})
            })
    }

    function updateById(id, updates){
        const query = {
            id: id
        };

        update(query, updates);
    }

    function remove(query){
        generateId(query);

        return accessCollection()
            .then(col => col.deleteMany(query))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(collection, 'delete'));
                return Promise.resolve({status: 'deleted', id: query.id})
            });
    }

    function removeById(id) {
        const query = {
            id: id
        };

        return remove(query);
    }

    function generateId(obj){
        if(!obj || !obj.id) return;

        if(!mongo.ObjectID.isValid(obj.id))
            return Promise.reject(error.invalidParameters('id'));

        obj._id = mongo.ObjectID(obj.id);
        delete obj.id
    }

    function filterProperties(obj){
        let res = {};

        for(let i = 0; i < filter.length; i++){
            let name = filter[i];
            if (obj[name]) res[name] = obj[name]
        }

        return res
    }

};