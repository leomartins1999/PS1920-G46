"use strict";
exports.__esModule = true;
var Org = /** @class */ (function () {
    function Org(_a) {
        var name = _a.name, description = _a.description, phone = _a.phone, siteLink = _a.siteLink, facebookLink = _a.facebookLink, linkedinLink = _a.linkedinLink;
        /**
         * dictionary<id, user_type> containing users followed by this org
         */
        this.following = {};
        this.nrFollowing = 0;
        /**
         * dictionary<id, user_type> containing users following this org
         */
        this.followers = {};
        this.nrFollowers = 0;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.siteLink = siteLink;
        this.facebookLink = facebookLink;
        this.linkedinLink = linkedinLink;
    }
    Org.prototype.setId = function (id) {
        this._id = id.id;
    };
    return Org;
}());
exports["default"] = Org;
