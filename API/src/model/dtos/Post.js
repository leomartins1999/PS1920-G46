// utils dependency
const TYPE = 'posts';
const utils = require('../Utils')();

/**
 * Representation of a post
 */
class Post {

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     */
    constructor(req) {
        this.owner_id = req.user.user_id;

        this.description = req.body.description;
        this.imageLink = req.body.imageLink;

        this.time = Date.now();

        this.likes = {}
    }

    /**
     * Validates if the object has the required fields to be put in the database
     * @returns boolean true if valid; false is invalid
     */
    validate(){
        return this.owner_id && this.description && this.time;
    }

    /**
     * sets the object's ID and, if necessary, updates the image link
     * @param id new id
     */
    setId(id){
        this.id = id;
        if (!this.imageLink) this.imageLink = utils.getImageLink(TYPE, id)
    }

}

module.exports = Post;