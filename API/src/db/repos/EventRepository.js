"use strict";
exports.__esModule = true;
var Repository_1 = require("./Repository");
var MongoQuery_1 = require("../MongoQuery");
/**
 * name of database collection
 */
var COLLECTION_NAME = 'events';
/**
 * properties that cannot be changed
 */
var FILTER = ['_id', 'owner_id', 'name'];
/**
 * streamlines operations within the events collection
 */
var EventRepository = /** @class */ (function () {
    function EventRepository(db_name) {
        this.repository = new Repository_1["default"](db_name, COLLECTION_NAME, FILTER);
    }
    /**
     * inserts an event in the collection
     */
    EventRepository.prototype.insertEvent = function (event) {
        return this.repository.insert(event);
    };
    /**
     * gets events from collection
     */
    EventRepository.prototype.getEvents = function (limit, skip, owner_id) {
        var query = new MongoQuery_1["default"](limit, skip)
            .searchFor('owner_id', owner_id)
            .sortBy('date', false);
        return this.repository.select(query);
    };
    /**
     * retrieves events of owners supplied in array
     */
    EventRepository.prototype.getEventsForOwners = function (ids, limit, skip) {
        if (ids.length === 0)
            return Promise.resolve([]);
        var query = new MongoQuery_1["default"](limit, skip)
            .filterInArray('owner_id', ids)
            .sortBy('date', false);
        return this.repository.select(query);
    };
    /**
     * gets a specific event
     */
    EventRepository.prototype.getEventById = function (id) {
        return this.repository.selectById(id);
    };
    /**
     * updates a specific event
     */
    EventRepository.prototype.updateEvent = function (id, updates) {
        var query = new MongoQuery_1["default"]()
            .searchById(id);
        return this.repository.update(query, updates);
    };
    return EventRepository;
}());
exports["default"] = EventRepository;
