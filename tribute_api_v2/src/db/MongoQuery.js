"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var Structures_1 = require("../Structures");
/**
 * default limit value
 */
exports.DEFAULT_LIMIT = '20';
/**
 * default skip value
 */
exports.DEFAULT_SKIP = '0';
/**
 * auxiliary structure used to query the database
 */
var MongoQuery = /** @class */ (function () {
    function MongoQuery(limit, skip) {
        if (limit === void 0) { limit = exports.DEFAULT_LIMIT; }
        if (skip === void 0) { skip = exports.DEFAULT_SKIP; }
        this.query = {};
        this.options = { limit: parseInt(limit), skip: parseInt(skip), sort: [] };
    }
    /**
     * used to query a specific document in the database (by its '_id' field)
     */
    MongoQuery.prototype.searchById = function (id) {
        if (!mongodb_1.ObjectId.isValid(id))
            throw new Structures_1.Error("Invalid id supplied - " + id);
        this.query._id = new mongodb_1.ObjectId(id);
        return this;
    };
    /**
     * searches for a specific value in a certain field
     */
    MongoQuery.prototype.searchFor = function (fieldName, value) {
        if (value != null && value.trim() != '')
            this.query[fieldName] = value;
        return this;
    };
    /**
     * sorts the results given
     */
    MongoQuery.prototype.sortBy = function (fieldName, asc) {
        this.options.sort.push([fieldName, asc ? 'asc' : 'desc']);
        return this;
    };
    /**
     * uses the text index to query the database
     */
    MongoQuery.prototype.searchWithTextIndex = function (value) {
        if (value != null && value.trim() != '')
            this.query.$query = { $text: { $search: value } };
        return this;
    };
    return MongoQuery;
}());
exports.default = MongoQuery;
