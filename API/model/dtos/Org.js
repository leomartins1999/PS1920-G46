/**
 * Representation of an organization
 */
class Org{

    /**
     * Constructs from the register operation
     */
    constructor(data) {
        this.getPropertiesFromObject(data)
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

module.exports = Org;