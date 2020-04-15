class Image{

    constructor(req, content) {
        this.type = req.params.image_type;
        this.id = req.params.image_id;

        if (content) this.content = req.files.file.data;
    }

    validate(content){
        return (content)?
            this.id && this.type && this.content :
            this.id && this.type;
    }

    canPost(user_type){
        let type = user_type + 's';

        if (type === this.type || this.type === 'posts') return true;
        if (type === 'orgs' && this.type === 'events') return true;

        return false;
    }


}

module.exports = Image;