"use strict";
exports.__esModule = true;
var randomStr = require('randomstring');
var hash = require('@sindresorhus/fnv1a');
var SALT_LENGTH = 8;
var User = /** @class */ (function () {
    function User(mail, password, user_type) {
        this.mail = mail;
        this.salt = randomStr.generate(SALT_LENGTH); // generate salt randomly
        this.hash = hash("" + password + this.salt); // generate hash from password
        this.user_type = user_type;
    }
    return User;
}());
exports["default"] = User;
