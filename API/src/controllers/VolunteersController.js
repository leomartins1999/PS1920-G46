"use strict";
exports.__esModule = true;
var RequestHandler_1 = require("./RequestHandler");
var Structures_1 = require("../Structures");
var MiddlewareController_1 = require("./MiddlewareController");
/**
 * defines endpoints related to volunteer
 */
var VolunteersController = /** @class */ (function () {
    function VolunteersController(service, router) {
        var _this = this;
        /**
         * get volunteers route handler
         */
        this.getVolunteers = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getVolunteers(req.query.limit, req.query.skip, req.query.name); }, res);
        };
        /**
         * get volunteer by id route handler
         */
        this.getVolunteerById = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getVolunteerById(req.params.volunteer_id); }, res, 200, 404);
        };
        /**
         * get mail of volunteer route handler
         */
        this.getVolunteerMail = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getVolunteerMail(req.params.volunteer_id); }, res, 200, 404);
        };
        /**
         * follow volunteer route handler
         */
        this.followVolunteer = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.follow(req.user.id, req.user.user_type, req.params.volunteer_id, Structures_1.UserType.Volunteer); }, res, 201);
        };
        /**
         * update volunteer route handler
         */
        this.updateVolunteer = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateVolunteer(req.user.id, req.params.volunteer_id, req.body); }, res, 201, 401);
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets routes
     */
    VolunteersController.prototype.setupRoutes = function (router) {
        router.get('/volunteers', this.getVolunteers);
        router.get('/volunteers/:volunteer_id', this.getVolunteerById);
        router.get('/auth/volunteers/:volunteer_id/mail', MiddlewareController_1["default"].orgCheck, this.getVolunteerMail);
        router.put('/auth/volunteers/:volunteer_id/follow', this.followVolunteer);
        router.put('/auth/volunteers/:volunteer_id', MiddlewareController_1["default"].volunteerCheck, this.updateVolunteer);
    };
    return VolunteersController;
}());
exports["default"] = VolunteersController;
