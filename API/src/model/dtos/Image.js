/**
 * Representation of an image
 */
class Image{

    /**
     * Standard constructor used by the API
     * @param req Express' Request
     * @param content if the file has content (to be uploaded to the API)
     */
    constructor(req, content) {
        this.type = req.params.image_type;
        this.id = req.params.image_id;

        if (content) this.content = req.files.file.data;
    }

    /**
     * Validates the integrity of the object
     * @param content must the image have content?
     * @returns boolean true if valid; false if invalid
     */
    validate(content){
        return (content)?
            this.id && this.type && this.content :
            this.id && this.type;
    }

    /**
     * Checks if the given user type can post this image to the API
     * @param user_type user's user_type (volunteer or org)
     * @returns boolean if user can post the image; false if not
     */
    canPost(user_type){
        let type = user_type + 's';

        if (type === this.type || this.type === 'posts') return true;
        if (type === 'orgs' && this.type === 'events') return true;

        return false;
    }

}

module.exports = Image;