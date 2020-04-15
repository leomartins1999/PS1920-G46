// utils dependency
const TYPE = 'post';
const utils = require('../Utils')(TYPE);

/**
 * Class Representative of posts
 */
class Post {

    /**
     * Constructs object from API layer
     */
    constructor(req) {
        this.owner_id = req.user.user_id;

        this.description = req.body.description;
        this.imageLink = req.body.imageLink;

        this.time = Date.now();

        this.likes = {}
    }

    validate(){
        return this.owner_id && this.description && this.time;
    }

    setId(id){
        this.id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(id)
    }

}

module.exports = Post;