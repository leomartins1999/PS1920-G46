"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("./RequestHandler");
/**
 * defines endpoints related to images
 */
var ImagesController = /** @class */ (function () {
    function ImagesController(service, router) {
        var _this = this;
        /**
         * get image route handler
         */
        this.getImage = function (req, res) {
            try {
                _this.service
                    .getImage(req.params.type, req.params.id)
                    .then(function (body) { return ImagesController.sendImage(res, body); })
                    .catch(function (err) { return RequestHandler_1.handleError(res, 404, err); });
            }
            catch (e) {
                RequestHandler_1.handleError(res, 500, e);
            }
        };
        /**
         * update volunteer image route handler
         */
        this.updateVolunteerImage = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateVolunteerImage(req.user.id, req.params.volunteer_id, req.body.data); }, res, 201);
        };
        /**
         * update org image route handler
         */
        this.updateOrgImage = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateOrgImage(req.user.id, req.params.org_id, req.body.data); }, res, 201);
        };
        /**
         * update post image route handler
         */
        this.updatePostImage = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updatePostImage(req.user.id, req.params.post_id, req.body.data); }, res, 201);
        };
        /**
         * update event image route handler
         */
        this.updateEventImage = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateEventImage(req.user.id, req.params.event_id, req.body.data); }, res, 201);
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets up routes
     */
    ImagesController.prototype.setupRoutes = function (router) {
        router.get('/images/:type/:id', this.getImage);
        router.put('/auth/images/volunteers/:volunteer_id', this.updateVolunteerImage);
        router.put('/auth/images/orgs/:org_id', this.updateOrgImage);
        router.put('/auth/images/posts/:post_id', this.updatePostImage);
        router.put('/auth/images/events/:event_id', this.updateEventImage);
    };
    /**
     * ends response object with image content
     */
    ImagesController.sendImage = function (res, body) {
        res.statusCode = 200;
        res.end(body);
    };
    return ImagesController;
}());
exports.default = ImagesController;
