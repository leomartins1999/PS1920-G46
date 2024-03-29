"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var hash = require('@sindresorhus/fnv1a');
var BaseService_1 = require("./BaseService");
var Structures_1 = require("../Structures");
var User_1 = require("../dtos/User");
/**
 * service functions related to authentication
 */
var AuthService = /** @class */ (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * registers volunteer
     */
    AuthService.prototype.registerVolunteer = function (mail, password, volunteer) {
        return __awaiter(this, void 0, void 0, function () {
            var users, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BaseService_1["default"].userRepository.getUserByMail(mail)];
                    case 1:
                        users = _a.sent();
                        if (users.length > 0)
                            return [2 /*return*/, Promise.reject(new Structures_1.Error('User already registered with this email.'))];
                        return [4 /*yield*/, BaseService_1["default"].userRepository.insertUser(new User_1["default"](mail, password, Structures_1.UserType.Volunteer))];
                    case 2:
                        id = _a.sent();
                        volunteer.setId(id);
                        return [2 /*return*/, BaseService_1["default"].volunteerRepo.insertVolunteer(volunteer)];
                }
            });
        });
    };
    /**
     * registers org
     */
    AuthService.prototype.registerOrg = function (mail, password, org) {
        return __awaiter(this, void 0, void 0, function () {
            var users, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BaseService_1["default"].userRepository.getUserByMail(mail)];
                    case 1:
                        users = _a.sent();
                        if (users.length > 0)
                            return [2 /*return*/, Promise.reject(new Structures_1.Error('User already registered with this email.'))];
                        return [4 /*yield*/, BaseService_1["default"].userRepository.insertUser(new User_1["default"](mail, password, Structures_1.UserType.Org))];
                    case 2:
                        id = _a.sent();
                        org.setId(id);
                        return [2 /*return*/, BaseService_1["default"].orgRepo.insertOrg(org)];
                }
            });
        });
    };
    /**
     * determines success of login operation
     */
    AuthService.prototype.login = function (mail, password) {
        return __awaiter(this, void 0, void 0, function () {
            var users, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BaseService_1["default"].userRepository.getUserByMail(mail)];
                    case 1:
                        users = _a.sent();
                        if (users.length <= 0)
                            return [2 /*return*/, Promise.reject(new Structures_1.Error('Mail not associated with any account.'))];
                        user = users[0];
                        if (user.hash !== hash("" + password + user.salt))
                            return [2 /*return*/, Promise.reject(new Structures_1.Error('Invalid password.'))];
                        return [2 /*return*/, new Structures_1.Session(user._id, user.user_type)];
                }
            });
        });
    };
    return AuthService;
}(BaseService_1["default"]));
exports["default"] = AuthService;
