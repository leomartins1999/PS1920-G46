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
        this.owner_id = req.user.id;
        this.description = req.body.description;
        this.imageLink = req.body.imageLink;
    }

    validate(){
        return this.owner_id && this.description;
    }

    setId(id){
        this._id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(id)
    }

}

module.exports = Post;