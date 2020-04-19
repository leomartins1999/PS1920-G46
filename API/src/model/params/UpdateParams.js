const ServiceParams = require('../params/ServiceParams');

/**
 * Structure used to assist updating a document
 */
class UpdateParams {

    /**
     * Standard constructor
     * @param req Express' Request
     * @param data data to be updated
     */
    constructor(req, data) {
        this.params = new ServiceParams(req);
        this.data = data
    }


}