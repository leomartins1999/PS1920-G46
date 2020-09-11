"use strict";
exports.__esModule = true;
var RequestHandler_1 = require("./RequestHandler");
var Structures_1 = require("../Structures");
var MiddlewareController_1 = require("./MiddlewareController");
/**
 * defines endpoints related to orgs
 */
var OrgsController = /** @class */ (function () {
    function OrgsController(service, router) {
        var _this = this;
        /**
         * get orgs route handler
         */
        this.getOrgs = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getOrgs(req.query.limit, req.query.skip, req.query.name); }, res);
        };
        /**
         * get org by id route handler
         */
        this.getOrgById = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.getOrgById(req.params.org_id); }, res, 200, 404);
        };
        /**
         * follow org route handler
         */
        this.followOrg = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.follow(req.user.id, req.user.user_type, req.params.org_id, Structures_1.UserType.Org); }, res, 201);
        };
        /**
         * update org route handler
         */
        this.updateOrg = function (req, res) {
            RequestHandler_1.handleRequest(function () { return _this.service.updateOrg(req.user.id, req.params.org_id, req.body); }, res, 201);
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets up routes
     */
    OrgsController.prototype.setupRoutes = function (router) {
        router.get('/orgs', this.getOrgs);
        router.get('/orgs/:org_id', this.getOrgById);
        router.put('/auth/orgs/:org_id/follow', this.followOrg);
        router.put('/auth/orgs/:org_id', MiddlewareController_1["default"].orgCheck, this.updateOrg);
    };
    return OrgsController;
}());
exports["default"] = OrgsController;
