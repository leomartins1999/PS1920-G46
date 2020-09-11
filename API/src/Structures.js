"use strict";
exports.__esModule = true;
exports.Status = exports.Error = exports.Session = exports.getImageTypeForString = exports.ImageType = exports.UserType = exports.Id = void 0;
/**
 * represents an identifier
 */
var Id = /** @class */ (function () {
    function Id(insertedId) {
        this.id = insertedId;
    }
    return Id;
}());
exports.Id = Id;
/**
 * represents the existing user types
 */
var UserType;
(function (UserType) {
    UserType["Volunteer"] = "volunteer";
    UserType["Org"] = "org";
})(UserType = exports.UserType || (exports.UserType = {}));
/**
 * represents the existing image types
 */
var ImageType;
(function (ImageType) {
    ImageType["Volunteer"] = "volunteer";
    ImageType["Org"] = "org";
    ImageType["Post"] = "post";
    ImageType["Event"] = "event";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
/**
 * returns image type associated with string
 */
function getImageTypeForString(type) {
    switch (type) {
        case 'volunteers': return ImageType.Volunteer;
        case 'orgs': return ImageType.Org;
        case 'posts': return ImageType.Post;
        default: return ImageType.Event;
    }
}
exports.getImageTypeForString = getImageTypeForString;
/**
 * representation of session
 */
var Session = /** @class */ (function () {
    function Session(id, user_type) {
        this.id = id;
        this.user_type = user_type;
    }
    return Session;
}());
exports.Session = Session;
/**
 * representation of error
 */
var Error = /** @class */ (function () {
    function Error(message) {
        this.message = message;
    }
    return Error;
}());
exports.Error = Error;
/**
 * represents a status message
 */
var Status = /** @class */ (function () {
    function Status(message, success) {
        this.message = message;
        this.success = success;
    }
    return Status;
}());
exports.Status = Status;
