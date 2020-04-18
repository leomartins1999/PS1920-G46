// utils dependency
const utils = require('../Utils')();

// query options import
const QueryOptions = require('../QueryOptions');

/**
 * Class instantiated by default when executing an API operation
 * This object collects all existing parameters in the request
 */
class ServiceParams{

    /**
     * Standard constructor used by the API
     * Retrieves all properties in user (session object),
     * params(path parameters) given in URL and query
     * (query parameters) contained in the query string
     * @param req Express' Request
     */
    constructor(req) {
        utils.cloneObject(this, req.user);
        utils.cloneObject(this, req.params);
        utils.cloneObject(this, req.query);

        this.query_options = new QueryOptions(this.limit, this.skip)
    }

    /**
     * Checks if properties exist in this object
     * @param properties array of property names
     * @returns boolean true if all properties exist; false if not
     */
    checkFor(properties){
        return utils.checkFor(this, properties)
    }
}

module.exports = ServiceParams;