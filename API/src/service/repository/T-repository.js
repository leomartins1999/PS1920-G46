// dependencies
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// error module
const error = require('../../error/T-error')();

// utils module
const utils = require('../../model/Utils')();

// constants
const URL = "mongodb://localhost:27017/";

/**
 * Infrastructure responsible for handling all communication with
 * database. It supplies all CRUD operations through so that each
 * individual repository has the possibility to configure as they
 * can each operation
 */

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

    /**
     * Access the repository's collection
     * @returns {Promise<Collection>} Promise w/ collection object
     */
    function accessCollection(){
        return MongoClient.connect(URL)
            .then(db => db.db(db_name))
            .then(dbo => dbo.collection(collection));
    }

    /**
     * Creates a search index. This operation is required when the collection
     * supports searching by a similar name
     * @param searchables properties which are searchable
     */
    function createSearchIdx(searchables) {
        accessCollection()
            .then((col) => col.createIndex(searchables))
    }

    /**
     * Inserts the object in the collection
     * @param obj object to be inserted
     * @returns {Promise<Promise>} fulfilled when successful, with document's id;
     * When unsuccessful, rejected with database error
     */
    function insert(obj){
        generateId(obj);

        return accessCollection()
            .then(col => col.insertOne(obj))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(collection, 'insert'));
                return Promise.resolve({id: resp.insertedId})
            });
    }

    /**
     * Executes select within collection
     * @param query_options query options object
     * @returns {Promise<Promise | void | any[]>} When successful, is fulfilled with results;
     * When unsuccessful, rejected with database error
     */
    function select(query_options){
        generateId(query_options.query);

        return accessCollection()
            .then(col => col.find(query_options.query, query_options.options).toArray());
    }

    /**
     * Selects a specific document within a collection
     * @param query_options query options object
     * @returns {Promise<Promise | void | any[]>} When successful, is fulfilled with result;
     * When unsuccessful, rejected with database error
     */
    function selectById(query_options, id){
        query_options.searchById(id);

        return select(query_options)
            .then(res => Promise.resolve(res[0]));
    }

    /**
     * Updates documents in collection
     * @param query documents to be updated
     * @param obj new values
     * @returns {Promise<Promise>} When successful, is fulfilled with status message;
     * When unsuccessful, rejected with database error
     */
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

    /**
     * Updates a document in collection
     * @param id document id
     * @param updates new values
     * @returns {Promise<Promise>} When successful, is fulfilled with status message;
     * When unsuccessful, rejected with database error
     */
    function updateById(id, updates){
        const query = {
            id: id
        };

        return update(query, updates);
    }

    /**
     * Removes documents from a collection
     * @param query documents to be removed
     * @returns {Promise<Promise>} is fulfilled with status message;
     * When unsuccessful, rejected with database error
     */
    function remove(query){
        generateId(query);

        return accessCollection()
            .then(col => col.deleteMany(query))
            .then(resp => {
                if (!resp.result.ok) return Promise.reject(error.databaseError(collection, 'delete'));
                return Promise.resolve({status: 'deleted', id: query.id})
            });
    }

    /**
     * Removes a specific document from the collection
     * @param id id of document
     * @returns {Promise<Promise>} is fulfilled with status message;
     * When unsuccessful, rejected with database error
     */
    function removeById(id) {
        const query = {
            id: id
        };

        return remove(query);
    }

    /**
     * Replaces the id in the object for a mongodb Id
     * @param obj object
     */
    function generateId(obj){
        if(!obj || !obj.id) return;

        if(!mongo.ObjectID.isValid(obj.id))
            return Promise.reject(error.invalidParameters('id'));

        obj._id = mongo.ObjectID(obj.id);
        delete obj.id
    }

    /**
     * Filters properties in an obj
     * @param obj obj to be filtered
     * @returns obj filtered object
     */
    function filterProperties(obj){
        return utils.filter(obj, filter);
    }

};