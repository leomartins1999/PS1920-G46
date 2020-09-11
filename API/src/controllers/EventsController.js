"use strict";
exports.__esModule = true;
var RequestHandler_1 = require("./RequestHandler");
var MiddlewareController_1 = require("./MiddlewareController");
/**
 * defines endpoints related to events
 */
var EventsController = /** @class */ (function () {
    function EventsController(service, router) {
        var _this = this;
        /**
         * get events route handler
         */
        this.getEvents = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getEvents(req.query.limit, req.query.skip, req.query.owner_id); }, res);
        };
        this.getEventsForUser = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getEventsForUser(req.user.id, req.user.user_type, req.query.limit, req.query.skip); }, res);
        };
        /**
         * get event by id route handler
         */
        this.getEventById = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getEventById(req.params.event_id); }, res, 200, 404);
        };
        /**
         * add event route handler
         */
        this.addEvent = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.addEvent(req.user.id, req.body.name, req.body.description, req.body.date, req.body.time, req.body.location); }, res, 201);
        };
        /**
         * interested in event route handler
         */
        this.interestedInEvent = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.interestedInEvent(req.user.id, req.params.event_id); }, res, 201);
        };
        /**
         * update event route handler
         */
        this.updateEvent = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateEvent(req.user.id, req.params.event_id, req.body); }, res);
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets routes
     */
    EventsController.prototype.setupRoutes = function (router) {
        router.get('/events', this.getEvents);
        router.get('/auth/events', this.getEventsForUser);
        router.get('/events/:event_id', this.getEventById);
        router.post('/auth/events', MiddlewareController_1["default"].orgCheck, this.addEvent);
        router.put('/auth/events/:event_id/interested', MiddlewareController_1["default"].volunteerCheck, this.interestedInEvent);
        router.put('/auth/events/:event_id/', MiddlewareController_1["default"].orgCheck, this.updateEvent);
    };
    return EventsController;
}());
exports["default"] = EventsController;
