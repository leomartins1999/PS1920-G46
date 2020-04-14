/**
 * Structure used while executing the follow operation
 */
class FollowParams{

    /**
     * Constructs object from API data
     */
    constructor(req, volunteer) {
        this.id = req.user.id;
        this.user_type = req.user.user_type;
        this.followedId = volunteer? req.params.volunteer_id: req.params.org_id
    }

    /**
     * validates the consistency of the object
     */
    validate(){
        return this.id && this.user_type && this.followedId
    }

}

module.exports = FollowParams;