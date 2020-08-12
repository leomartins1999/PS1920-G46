"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Repository_1 = require("./Repository");
var MongoQuery_1 = require("../MongoQuery");
/**
 * name of database collection
 */
var COLLECTION_NAME = 'posts';
/**
 * properties that cannot be changed
 */
var FILTER = ['_id', 'owner_id', 'time'];
/**
 * streamlines operations within the posts collection
 */
var PostRepository = /** @class */ (function () {
    function PostRepository(db_name) {
        this.repository = new Repository_1.default(db_name, COLLECTION_NAME, FILTER);
    }
    /**
     * inserts a post in the collection
     */
    PostRepository.prototype.insertPost = function (post) {
        return this.repository.insert(post);
    };
    /**
     * retrieves posts from the collection
     */
    PostRepository.prototype.getPosts = function (limit, skip, owner_id) {
        var query = new MongoQuery_1.default(limit, skip)
            .searchFor('owner_id', owner_id)
            .sortBy('time', false);
        return this.repository.select(query);
    };
    /**
     * retrieves a specific post
     */
    PostRepository.prototype.getPostById = function (id) {
        return this.repository.selectById(id);
    };
    /**
     * updates a specific post
     */
    PostRepository.prototype.updatePost = function (id, post) {
        var query = new MongoQuery_1.default()
            .searchById(id);
        return this.repository.update(query, post);
    };
    return PostRepository;
}());
exports.default = PostRepository;
