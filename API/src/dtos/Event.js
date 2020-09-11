"use strict";
exports.__esModule = true;
/**
 * representation of event
 */
var Event = /** @class */ (function () {
    function Event(owner_id, name, description, date, time, location) {
        /**
         * dictionary<id, user_type> of users interested in events
         */
        this.interested = {};
        this.nrInterested = 0;
        this.owner_id = owner_id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = (date && time) ? new Date(date + "T" + time + ":00").getTime() : null;
    }
    return Event;
}());
exports["default"] = Event;
