// module imports
const Volunteer = require("../dtos/Volunteer");
const Org = require("../dtos/Org");

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

    checkFor(properties){
        for (let i = 0; i < properties.length ; i++)
            if (!this[properties[i]]) return false;
        return true;
    }

    validate(){
        return true;
    }
}

module.exports = RegisterParams;