/**
 * Class Representative of posts
 */
class Post {

    /**
     * Constructs object from API layer
     */
    constructor(req) {
        this.owner_id = req.user.owner_id;
        this.description = req.body.description;
        this.imageLink = req.body.imageLink;
    }

}

module.exports = Post;