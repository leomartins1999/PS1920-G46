// utils dependency
const TYPE = 'volunteers';
const utils = require('../Utils')();

/**
 * Representation of a volunteer
 */
class Volunteer{

    /**
     * Standard constructor used by the RegisterParams
     * @param data register candidate fields (volunteer's fields)
     */
    constructor(data){
        this.name = data.name;
        this.description = data.description;
        this.linkedInLink = data.linkedInLink;
        this.imageLink = data.imageLink;

        this.following = {};
        this.followers = {};
    }

    /**
     * sets the object's ID and, if necessary, updates the image link
     * @param id new id
     */
    setId(id){
        this._id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(TYPE, id)
    }

    /**
     * Validates if the object has the required fields to be put in the database
     * @returns boolean true if valid; false is invalid
     */
    validate(){
        return this.name;
    }
}

module.exports = Volunteer;