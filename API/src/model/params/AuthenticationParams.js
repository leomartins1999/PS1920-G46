// query options import
const QueryOptions = require('../QueryOptions');

class AuthenticationParams{

    constructor(req) {
        this.email = req.body.email;
        this.password = req.body.password;

        this.query_options = new QueryOptions()
    }

}

module.exports = AuthenticationParams;