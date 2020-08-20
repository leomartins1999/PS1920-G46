class Image {

    readonly id: string
    /**
     * content of image
     */
    readonly body

    constructor(id: string, content) {
        this.id = id;
        this.body = content;
    }
}

export default Image