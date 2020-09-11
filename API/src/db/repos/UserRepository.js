"use strict";
exports.__esModule = true;
var Repository_1 = require("./Repository");
var MongoQuery_1 = require("../MongoQuery");
/**
 * name of database collection
 */
var COLLECTION_NAME = 'user';
/**
 * streamlines operations within the events collection
 */
var UserRepository = /** @class */ (function () {
    function UserRepository(db_name) {
        this.repository = new Repository_1["default"](db_name, COLLECTION_NAME);
    }
    /**
     * inserts user in the collection
     */
    UserRepository.prototype.insertUser = function (user) {
        return this.repository.insert(user);
    };
    /**
     * retrieves a specific user (by its id)
     */
    UserRepository.prototype.getUserById = function (id) {
        return this.repository.selectById(id);
    };
    /**
     * retrieves a specific user (by its mail)
     */
    UserRepository.prototype.getUserByMail = function (mail) {
        var query = new MongoQuery_1["default"]()
            .searchFor('mail', mail);
        return this.repository.select(query);
    };
    return UserRepository;
}());
exports["default"] = UserRepository;
