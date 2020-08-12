"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var MongoQuery_1 = require("../MongoQuery");
var Structures_1 = require("../../Structures");
/**
 * mongodb database connection string
 */
var URL = 'mongodb://localhost:27017/';
// instantiation of mongo client
var client = mongodb_1.MongoClient;
/**
 * Class responsible for handling all operation within a specific
 * database collection
 */
var Repository = /** @class */ (function () {
    function Repository(db_name, collection_name, filter, indexDescriptors) {
        if (filter === void 0) { filter = []; }
        if (indexDescriptors === void 0) { indexDescriptors = []; }
        this.db_name = db_name;
        this.collection_name = collection_name;
        this.filter = filter;
        // create search indexes
        for (var _i = 0, indexDescriptors_1 = indexDescriptors; _i < indexDescriptors_1.length; _i++) {
            var descriptor = indexDescriptors_1[_i];
            this.createSearchIndex(descriptor);
        }
    }
    /**
     * attempts to establish connection to database, returns collection
     */
    Repository.prototype.accessCollection = function () {
        var _this = this;
        return client.connect(URL)
            .then(function (db) { return db.db(_this.db_name); })
            .then(function (dbo) { return dbo.collection(_this.collection_name); });
    };
    /**
     * creates a search index based on the given descriptor
     */
    Repository.prototype.createSearchIndex = function (descriptor) {
        var _this = this;
        this.accessCollection()
            .then(function (col) { return col.createIndex(descriptor); })
            .then(function (_) { return console.log("Success creating index for " + _this.collection_name); })
            .catch(function (err) { return console.log("Error creating index for " + _this.collection_name + " - " + err); });
    };
    /**
     * applies filter to updates to be made in object so that some fields cannot be changed
     */
    Repository.prototype.applyFilter = function (update) {
        for (var _i = 0, _a = this.filter; _i < _a.length; _i++) {
            var prop = _a[_i];
            delete update[prop];
        }
        return update;
    };
    /**
     * inserts a new document in the collection
     */
    Repository.prototype.insert = function (object) {
        var _this = this;
        return this.accessCollection()
            .then(function (col) { return col.insertOne(object); })
            .then(function (res) { return res.result.ok ?
            Promise.resolve(new Structures_1.Id(res.insertedId)) :
            Promise.reject(new Structures_1.Error("Insert failed on " + _this.collection_name)); });
    };
    /**
     * select documents from the collection using the given query
     */
    Repository.prototype.select = function (query) {
        if (query === void 0) { query = new MongoQuery_1.default(); }
        return this.accessCollection()
            .then(function (col) { return col.find(query.query, query.options).toArray(); });
    };
    /**
     * selects a specific document by its id
     */
    Repository.prototype.selectById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = new MongoQuery_1.default()
                            .searchById(id);
                        return [4 /*yield*/, this.select(query)];
                    case 1:
                        results = _a.sent();
                        if (results.length <= 0)
                            return [2 /*return*/, Promise.reject(new Structures_1.Error("Entity with id " + id + " not found."))];
                        return [2 /*return*/, results[0]];
                }
            });
        });
    };
    /**
     * updates selected documents of the collection
     */
    Repository.prototype.update = function (query, update) {
        var _this = this;
        return this.accessCollection()
            .then(function (col) { return col.updateMany(query.query, { $set: _this.applyFilter(update) }, { upsert: true }); })
            .then(function (res) { return res.matchedCount > 0 || res.upsertedCount > 0 ?
            Promise.resolve(new Structures_1.Status('success', true)) :
            Promise.reject(new Structures_1.Error("Update failed on " + _this.collection_name + " for " + query)); });
    };
    /**
     * removes selected documents of the collection
     */
    Repository.prototype.remove = function (query) {
        var _this = this;
        return this.accessCollection()
            .then(function (col) { return col.deleteMany(query.query); })
            .then(function (res) { return res.result.ok ?
            Promise.resolve(new Structures_1.Status('success', true)) :
            Promise.reject(new Structures_1.Error("Delete failed on " + _this.collection_name + " for " + query)); });
    };
    return Repository;
}());
exports.default = Repository;
