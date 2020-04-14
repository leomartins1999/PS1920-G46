// module imports
const Volunteer = require("../dtos/Volunteer");
const Org = require("../dtos/Org");

// utils dependency
const utils = require('../Utils')();

/**
 * Structure used while executing the register operation
 */
class RegisterParams{

    /**
     * Constructor used in the API layer
     */
    constructor(req) {
        this.email = req.body.email;
        this.password = req.body.password;
        this.user_type = req.body.user_type;

        this.data = (this.user_type === 'volunteer')? new Volunteer(req.body.data) : new Org(req.body.data)
    }

    /**
     * check for specific
     * @param properties
     * @returns {boolean}
     */
    checkFor(properties){ return utils.checkFor(this, properties) }

    /**
     * validates the consistency of the object
     */
    validate(){
        return this.data.validate() && this.email && this.password && this.user_type
    }
}

module.exports = RegisterParams;