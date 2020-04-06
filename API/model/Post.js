/**
 * Class Representative of posts
 */
class Post{

    /**
     * constructs post from API layer
     */
    constructor(owner_id, body) {
        this.owner_id = owner_id;
        this.description = body.description;
        this.imageLink = body.imageLink;
    }

}