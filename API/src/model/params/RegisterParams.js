// module imports
const Volunteer = require("../dtos/Volunteer");
const Org = require("../dtos/Org");

// utils dependency
const utils = require('../Utils')();

// query options import
const QueryOptions = require('../QueryOptions');

/**
 * Object generated when attempting to register in the API
 */
class RegisterParams{

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     */
    constructor(req) {
        this.email = req.body.email;
        this.password = req.body.password;
        this.user_type = req.body.user_type;

        this.data = (this.user_type === 'volunteer')? new Volunteer(req.body.data) : new Org(req.body.data);

        this.query_options = new QueryOptions(req.query.limit, req.query.skip)
    }

    /**
     * Validates if the object has the required fields
     * @returns boolean true if valid; false is invalid
     */
    validate(){
        return this.data.validate() && this.email && this.password && this.user_type
    }
}

module.exports = RegisterParams;