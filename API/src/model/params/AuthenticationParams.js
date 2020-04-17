// query options import
const QueryOptions = require('../QueryOptions');

/**
 * Object generated when attempting to login an user
 */
class AuthenticationParams{

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     */
    constructor(req) {
        this.email = req.body.email;
        this.password = req.body.password;

        this.query_options = new QueryOptions()
    }

}

module.exports = AuthenticationParams;