// utils dependency
const TYPE = 'org';
const utils = require('../Utils')(TYPE);

/**
 * Representation of an organization
 */
class Org{

    /**
     * Constructs from the register operation
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

    setId(id){
        this._id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(id)
    }

    /**
     * validates the object to be inserted in database
     */
    validate(){
        return this.name;
    }
}

module.exports = Org;