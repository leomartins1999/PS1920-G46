"use strict";
exports.__esModule = true;
var Volunteer = /** @class */ (function () {
    function Volunteer(_a) {
        var name = _a.name, description = _a.description, linkedinLink = _a.linkedinLink;
        /**
         * dictionary<id, user_type> composed by users followed by this volunteer
         */
        this.following = {};
        this.nrFollowing = 0;
        /**
         * * dictionary<id, user_type> composed by users following this volunteer
         */
        this.followers = {};
        this.nrFollowers = 0;
        this.name = name;
        this.description = description;
        this.linkedinLink = linkedinLink;
    }
    Volunteer.prototype.setId = function (id) {
        this._id = id.id;
    };
    return Volunteer;
}());
exports["default"] = Volunteer;
