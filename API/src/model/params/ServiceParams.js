// utils dependency
const utils = require('../Utils')();

// query options import
const QueryOptions = require('../QueryOptions');

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

        this.query_options = new QueryOptions(req.query.limit, req.query.skip)
    }

    checkFor(properties){
        return utils.checkFor(this, properties)
    }

    getPropertiesFromObject(obj){
        if (!obj) return;

        for(let propertyName in obj)
            this[propertyName] = obj[propertyName];
    }
}

module.exports = ServiceParams;