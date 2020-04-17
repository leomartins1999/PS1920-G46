// dependencies
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// error module
const error = require('../../error/T-error')();

// utils module
const utils = require('../../model/Utils')();

// constants
const URL = "mongodb://localhost:27017/";

module.exports = (db_name, collection, filter, searchables) => {
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
            .then(db => db.db(db_name))
            .then(dbo => dbo.collection(collection));
    }

    function createSearchIdx(searchables) {
        accessCollection()
            .then((col) => col.createIndex(searchables))
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

    function select(query_options){
        generateId(query_options.query);

        return accessCollection()
            .then(col => col.find(query_options.query, query_options.options).toArray());
    }

    function selectById(query_options, id){
        query_options.searchById(id);

        return select(query_options)
            .then(res => Promise.resolve(res[0]));
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

        return update(query, updates);
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
        return utils.filter(obj, filter);
    }

};