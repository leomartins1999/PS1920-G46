// utils dependency
const TYPE = 'volunteer';
const utils = require('../Utils')(TYPE);

/**
 * Representation of volunteer
 */
class Volunteer{

    /**
     * Constructs from data given in register call
     */
    constructor(data){
        this.name = data.name;
        this.description = data.description;
        this.linkedInLink = data.linkedInLink;
        this.imageLink = data.imageLink;

        this.following = {};
        this.followers = {};
    }

    setId(id){
        this._id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(id)
    }

    validate(){
        return this.name;
    }
}

module.exports = Volunteer;