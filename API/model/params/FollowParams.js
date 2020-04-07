/**
 * Structure used while executing the follow operation
 */
class FollowParams{

    /**
     * Constructs object from API data
     */
    constructor(req) {
        this.follower_id = req.user.id;
        this.follower_type = req.user.user_type;
        this.followed_type = req.params.volunteer_id
    }

}

module.exports = FollowParams;