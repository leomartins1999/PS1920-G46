// utils dependency
const TYPE = 'events';
const utils = require('../Utils')();

/**
 * Representation of an Event
 */
class _Event{

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     */
    constructor(req){
        this.org_id = req.user.user_id;

        this.name = req.body.name;
        this.description = req.body.description;
        this.date = req.body.date;
        this.location = req.body.location;
        this.imageLink = req.body.imageLink;

        this.interested = {};
        this.participants = {};
    }

    /**
     * sets the object's ID and, if necessary, updates the image link
     * @param id new id
     */
    setId(id){
        this.id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(TYPE, id)
    }

    /**
     * Validates if the object has the required fields to be put in the database
     * @returns boolean true if valid; false is invalid
     */
    validate(){
        return this.org_id && this.name && this.description;
    }
}

module.exports = _Event;