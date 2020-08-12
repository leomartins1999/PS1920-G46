"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * representation of event
 */
var Event = /** @class */ (function () {
    function Event(owner_id, name, description, date, location) {
        /**
         * dictionary<id, user_type> of users interested in events
         */
        this.interested = {};
        this.nrInterested = 0;
        this.owner_id = owner_id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = new Date(date);
    }
    return Event;
}());
exports.default = Event;
