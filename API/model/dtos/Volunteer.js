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
    }

    validate(){
        return this.name;
    }
}

module.exports = Volunteer;