"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var VolunteerRepository_1 = require("../db/repos/VolunteerRepository");
var OrgRepository_1 = require("../db/repos/OrgRepository");
var PostRepository_1 = require("../db/repos/PostRepository");
var EventRepository_1 = require("../db/repos/EventRepository");
var ImageRepository_1 = require("../db/repos/ImageRepository");
var UserRepository_1 = require("../db/repos/UserRepository");
var Structures_1 = require("../Structures");
var DB_NAME = 'tribute_db_test';
/**
 * base service class, containing references to instances of
 * repositories and other common functions
 */
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    /**
     * returns get by id and update functions depending on user type
     */
    BaseService.prototype.userOperations = function (user_type) {
        return user_type === Structures_1.UserType.Org ? {
            get: function (id) { return BaseService.orgRepo.getOrgById(id); },
            update: function (id, updates) { return BaseService.orgRepo.updateOrg(id, updates); }
        } : {
            get: function (id) { return BaseService.volunteerRepo.getVolunteerById(id); },
            update: function (id, updates) { return BaseService.volunteerRepo.updateVolunteer(id, updates); }
        };
    };
    /**
     * retrieves ids of users being followed by given user
     */
    BaseService.prototype.getIdsOfFollowing = function (id, user_type) {
        return __awaiter(this, void 0, void 0, function () {
            var user, ids, _i, _a, following_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userOperations(user_type)
                            .get(id)];
                    case 1:
                        user = _b.sent();
                        ids = [];
                        for (_i = 0, _a = Object.keys(user.following); _i < _a.length; _i++) {
                            following_id = _a[_i];
                            console.log(following_id);
                            ids.push(following_id);
                        }
                        return [2 /*return*/, ids];
                }
            });
        });
    };
    /**
     * user A(follower) follows user B(followed)
     * @param follower_id
     * @param follower_user_type
     * @param followed_id
     * @param followed_user_type
     */
    BaseService.prototype.follow = function (follower_id, follower_user_type, followed_id, followed_user_type) {
        return __awaiter(this, void 0, void 0, function () {
            var follower_operations, followed_operations, followed, follower, followedUpdate, followerUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (follower_id === followed_id)
                            return [2 /*return*/, Promise.reject(new Structures_1.Error('User can\'t follow itself.'))
                                // getting associated operations
                            ];
                        follower_operations = this.userOperations(follower_user_type);
                        followed_operations = this.userOperations(followed_user_type);
                        return [4 /*yield*/, followed_operations.get(followed_id)
                            // fetching follower
                        ];
                    case 1:
                        followed = _a.sent();
                        return [4 /*yield*/, follower_operations.get(follower_id)
                            // setting fields
                        ];
                    case 2:
                        follower = _a.sent();
                        // setting fields
                        if (followed.followers[follower_id])
                            delete followed.followers[follower_id];
                        else
                            followed.followers[follower_id] = follower_user_type;
                        if (follower.following[followed_id])
                            delete follower.following[followed_id];
                        else
                            follower.following[followed_id] = followed_user_type;
                        // updating counts
                        followed.nrFollowers = Object.keys(followed.followers).length;
                        follower.nrFollowing = Object.keys(follower.followers).length;
                        return [4 /*yield*/, followed_operations.update(followed_id, followed)];
                    case 3:
                        followedUpdate = _a.sent();
                        return [4 /*yield*/, follower_operations.update(follower_id, follower)];
                    case 4:
                        followerUpdate = _a.sent();
                        return [2 /*return*/, followerUpdate.success && followedUpdate.success ?
                                new Structures_1.Status('Follow was changed.', true) :
                                Promise.reject(new Structures_1.Error('Follow operation was unsuccessful.'))];
                }
            });
        });
    };
    BaseService.volunteerRepo = new VolunteerRepository_1.default(DB_NAME);
    BaseService.orgRepo = new OrgRepository_1.default(DB_NAME);
    BaseService.postRepo = new PostRepository_1.default(DB_NAME);
    BaseService.eventRepository = new EventRepository_1.default(DB_NAME);
    BaseService.imageRepository = new ImageRepository_1.default(DB_NAME);
    BaseService.userRepository = new UserRepository_1.default(DB_NAME);
    return BaseService;
}());
exports.default = BaseService;
