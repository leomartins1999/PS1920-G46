class Image{

    constructor(req, content) {
        this.id = req.params.image_id;
        this.type = req.params.image_type;

        if (content) this.content = req.files.file.data;
    }

    validate(content){
        return (content)?
            this.id && this.type && this.content :
            this.id && this.type;
    }


}

module.exports = Image;