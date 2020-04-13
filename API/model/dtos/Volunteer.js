/**
 * Representation of volunteer
 */
class Volunteer{

    /**
     * Constructs from data given in register call
     */
    constructor(data){
        this.getPropertiesFromObject(data);
    }

    getPropertiesFromObject(obj){
        if (!obj) return;

        for(let propertyName in obj)
            this[propertyName] = obj[propertyName];
    }

    validate(){
        return this.name;
    }
}

module.exports = Volunteer;