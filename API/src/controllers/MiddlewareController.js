"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("./RequestHandler");
var Structures_1 = require("../Structures");
/**
 * defines api middlewares used to restrict access of users to endpoints
 */
var MiddlewareController = /** @class */ (function () {
    function MiddlewareController(router) {
        /**
         * checks if user is authenticated
         */
        this.authenticationCheck = function (req, res, next) {
            req.user ? next() : RequestHandler_1.handleError(res, 401, new Structures_1.Error('This endpoint requires authentication.'));
        };
        this.setupMiddlewares(router);
    }
    /**
     * sets up middlewares
     */
    MiddlewareController.prototype.setupMiddlewares = function (router) {
        router.use('/auth', this.authenticationCheck);
    };
    /**
     * checks if user is org
     */
    MiddlewareController.orgCheck = function (req, res, next) {
        req.user.user_type === 'org' ? next() : RequestHandler_1.handleError(res, 401, new Structures_1.Error('This endpoint requires authentication by an org.'));
    };
    /**
     * checks if user is volunteer
     */
    MiddlewareController.volunteerCheck = function (req, res, next) {
        req.user.user_type === 'volunteer' ? next() : RequestHandler_1.handleError(res, 401, new Structures_1.Error('This endpoint requires authentication by a volunteer.'));
    };
    return MiddlewareController;
}());
exports.default = MiddlewareController;
