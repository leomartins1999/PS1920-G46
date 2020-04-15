// utils dependency
const TYPE = 'event';
const utils = require('../Utils')(TYPE);

/**
 * Event representation
 */
class _Event{

    /**
     * Constructs from API
     */
    constructor(req){
        this.org_id = req.user.id;

        this.name = req.body.name;
        this.description = req.body.name;
        this.date = req.body.date;
        this.location = req.body.location;
        this.imageLink = req.body.imageLink;

        this.interested = {};
        this.participants = {};
    }

    setId(id){
        this._id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(id)
    }

    validate(){
        return this.org_id && this.name && this.description;
    }
}

module.exports = _Event;