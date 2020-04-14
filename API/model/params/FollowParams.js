// utils dependency
const utils = require('../Utils')();

/**
 * Structure used while executing the follow operation
 */
class FollowParams{

    /**
     * Constructs object from API data
     */
    constructor(req) {
        this.id = req.user.id;
        this.user_type = req.user.user_type;
        this.volunteer_id = req.params.volunteer_id;
        this.org_id = req.params.org_id;
    }

    checkFor(properties){ utils.checkFor(this, properties) }

}

module.exports = FollowParams;