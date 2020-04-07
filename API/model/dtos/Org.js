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
        this.siteLink = data.siteLink;
        this.facebookLink = data.facebookLink;
        this.imageLink = data.imageLink;
    }

}

module.exports = Org;