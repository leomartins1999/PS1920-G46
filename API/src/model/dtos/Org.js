// utils dependency
const TYPE = 'orgs';
const utils = require('../Utils')();

/**
 * Representation of an organization
 */
class Org{

    /**
     * Standard constructor used by the RegisterParams
     * @param data register candidate fields (org's fields)
     */
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.phone = data.phone;
        this.mail = data.mail;
        this.siteLink = data.siteLink;
        this.facebookLink = data.facebookLink;

        this.followers = {};
        this.following = {};
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

module.exports = Org;