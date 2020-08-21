"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("./RequestHandler");
/**
 * defines endpoints related to posts
 */
var PostsController = /** @class */ (function () {
    function PostsController(service, router) {
        var _this = this;
        /**
         * get posts route handler
         */
        this.getPosts = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getPosts(req.query.limit, req.query.skip, req.query.owner_id); }, res);
        };
        /**
         * gets posts of users that is following
         */
        this.getPostsForUser = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getPostsForUser(req.user.id, req.user.user_type, req.query.limit, req.query.skip); }, res);
        };
        /**
         * add post route handler
         */
        this.addPost = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.addPost(req.user.id, req.user.user_type, req.body.body); }, res, 201);
        };
        /**
         * like post route handler
         */
        this.likePost = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.likePost(req.user.id, req.user.user_type, req.params.post_id); }, res, 201);
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets routes
     */
    PostsController.prototype.setupRoutes = function (router) {
        router.get('/posts', this.getPosts);
        router.get('/auth/posts', this.getPostsForUser);
        router.post('/auth/posts', this.addPost);
        router.put('/auth/posts/:post_id/like', this.likePost);
    };
    return PostsController;
}());
exports.default = PostsController;
