/**
 * Parameters for service operations
 */
class ServiceParams{

    /**
     * Constructs for API layer's request
     */
    constructor(req) {
        this.getPropertiesFromObject(req.user);
        this.getPropertiesFromObject(req.params);
        this.getPropertiesFromObject(req.query);
    }

    getPropertiesFromObject(obj){
        if (!obj) return;

        for(let propertyName in obj)
            this[propertyName] = obj[propertyName];
    }

    checkFor(propertyName){
        return this[propertyName]
    }
}

module.exports = ServiceParams;