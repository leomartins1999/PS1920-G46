/**
 * Class Representative of posts
 */
class Post {

    /**
     * Constructs object from API layer
     */
    constructor(req) {
        this.owner_id = req.user.id;
        this.description = req.body.description;
    }

    validate(){
        return this.owner_id && this.description;
    }

}

module.exports = Post;