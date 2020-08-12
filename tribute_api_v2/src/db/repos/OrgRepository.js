"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repository_1 = require("./Repository");
var MongoQuery_1 = require("../MongoQuery");
/**
 * name of database collection
 */
var COLLECTION_NAME = 'orgs';
/**
 * properties that cannot be changed
 */
var FILTER = ['_id', 'name'];
/**
 * descriptors used to create search indexes in the collection
 */
var INDEX_DESCRIPTORS = [{ name: 'text' }];
/**
 * streamlines operations within the orgs collection
 */
var OrgRepository = /** @class */ (function () {
    function OrgRepository(db_name) {
        this.repository = new Repository_1.default(db_name, COLLECTION_NAME, FILTER, INDEX_DESCRIPTORS);
    }
    /**
     * inserts an org in the database
     */
    OrgRepository.prototype.insertOrg = function (org) {
        return this.repository.insert(org);
    };
    /**
     * retrieves orgs from the database
     */
    OrgRepository.prototype.getOrgs = function (limit, skip, name) {
        var query = new MongoQuery_1.default(limit, skip)
            .sortBy('nrFollowers', false)
            .searchWithTextIndex(name);
        return this.repository.select(query);
    };
    /**
     * retrieves a specific org
     */
    OrgRepository.prototype.getOrgById = function (id) {
        return this.repository.selectById(id);
    };
    /**
     * updates a specific org
     */
    OrgRepository.prototype.updateOrg = function (id, updates) {
        var query = new MongoQuery_1.default()
            .searchById(id);
        return this.repository.update(query, updates);
    };
    return OrgRepository;
}());
exports.default = OrgRepository;
