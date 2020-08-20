"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestHandler_1 = require("./RequestHandler");
var Org_1 = require("../dtos/Org");
var Volunteer_1 = require("../dtos/Volunteer");
var Structures_1 = require("../Structures");
/**
 * defines endpoints related to authentication
 */
var AuthController = /** @class */ (function () {
    function AuthController(service, router) {
        var _this = this;
        /**
         * register route handler
         */
        this.register = function (req, res) {
            RequestHandler_1.handleRequest(function () { return req.body.user_type === 'volunteer' ?
                _this.service.registerVolunteer(req.body.mail, req.body.password, new Volunteer_1.default(req.body.data)) :
                _this.service.registerOrg(req.body.mail, req.body.password, new Org_1.default(req.body.data)); }, res, 201);
        };
        /**
         * login route handler
         */
        this.login = function (req, res) {
            try {
                _this.service.login(req.body.mail, req.body.password)
                    .then(function (session) { return req.login(session, function (_) { return RequestHandler_1.handleSuccess(res, 200, { user_details: req.user }); }); })
                    .catch(function (err) { return RequestHandler_1.handleError(res, 400, err); });
            }
            catch (e) {
                RequestHandler_1.handleError(res, 500, e);
            }
        };
        /**
         * logout route handler
         */
        this.logout = function (req, res) {
            try {
                req.logout();
                RequestHandler_1.handleSuccess(res, 200, new Structures_1.Status('Logout completed.', true));
            }
            catch (e) {
                RequestHandler_1.handleError(res, 500, e);
            }
        };
        this.service = service;
        this.setupRoutes(router);
    }
    /**
     * sets routes
     */
    AuthController.prototype.setupRoutes = function (router) {
        router.post('/register', this.register);
        router.post('/login', this.login);
        router.get('/logout', this.logout);
    };
    return AuthController;
}());
exports.default = AuthController;
