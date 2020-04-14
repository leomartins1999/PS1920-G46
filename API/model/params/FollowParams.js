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
        if (volunteer){
            this.followed_id = req.params.volunteer_id;
            this.followed_type = 'volunteer';
        }
        else{
            this.followed_id = req.params.org_id;
            this.followed_type = 'org';
        }
    }

    /**
     * validates the consistency of the object
     */
    validate(){
        return this.id && this.user_type && this.followed_id
    }

}

module.exports = FollowParams;