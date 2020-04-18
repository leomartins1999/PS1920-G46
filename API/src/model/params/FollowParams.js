// query options import
const QueryOptions = require('../QueryOptions');

/**
 * Object generated when attempting to execute a follow operation
 */
class FollowParams{

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     * @param volunteer boolean indicating if the user being followed is an volunteer
     */
    constructor(req, volunteer) {
        this.id = req.user.user_id;
        this.user_type = req.user.user_type;
        if (volunteer){
            this.followed_id = req.params.volunteer_id;
            this.followed_type = 'volunteer';
        }
        else{
            this.followed_id = req.params.org_id;
            this.followed_type = 'org';
        }

        this.query_options = new QueryOptions(req.query.limit, req.query.skip)
    }

    /**
     * Validates if the object has the required fields
     * @returns boolean true if valid; false is invalid
     */
    validate(){
        return this.id && this.user_type && this.followed_id && this.followed_type
    }

}

module.exports = FollowParams;