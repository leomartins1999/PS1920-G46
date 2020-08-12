"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repository_1 = require("./Repository");
var MongoQuery_1 = require("../MongoQuery");
/**
 * name of database collection
 */
var COLLECTION_NAME = 'volunteers';
/**
 * properties that cannot be changed
 */
var FILTER = ['_id', 'name'];
/**
 * descriptors used to create search indexes in the collection
 */
var INDEX_DESCRIPTORS = [{ name: 'text' }];
/**
 * streamlines operations within the volunteers collection
 */
var VolunteerRepository = /** @class */ (function () {
    function VolunteerRepository(db_name) {
        this.repository = new Repository_1.default(db_name, COLLECTION_NAME, FILTER, INDEX_DESCRIPTORS);
    }
    /**
     * inserts volunteer in the collection
     */
    VolunteerRepository.prototype.insertVolunteer = function (volunteer) {
        return this.repository.insert(volunteer);
    };
    /**
     * retrieves volunteers from the database
     */
    VolunteerRepository.prototype.getVolunteers = function (limit, skip, name) {
        var query = new MongoQuery_1.default(limit, skip)
            .sortBy('nrFollowers', false)
            .searchWithTextIndex(name);
        return this.repository.select(query);
    };
    /**
     * retrieves specific volunteer
     */
    VolunteerRepository.prototype.getVolunteerById = function (id) {
        return this.repository.selectById(id);
    };
    /**
     * updates a specific volunteer
     */
    VolunteerRepository.prototype.updateVolunteer = function (id, updates) {
        var query = new MongoQuery_1.default()
            .searchById(id);
        return this.repository.update(query, updates);
    };
    return VolunteerRepository;
}());
exports.default = VolunteerRepository;
