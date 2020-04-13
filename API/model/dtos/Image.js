class Image{

    constructor(req) {
        this.id = req.params.image_id;
        this.type = req.params.image_type;

        this.content = req.body.content;
    }

    validate(content){
        return (content)?
            this.id && this.type && this.content :
            this.id && this.type;
    }


}

module.exports = Image;