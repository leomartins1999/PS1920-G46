class Post {

    _id: string
    /**
     * id of owner of post
     */
    readonly owner_id: string
    readonly owner_type: string
    readonly body: string
    readonly time = Date.now()
    /**
     * dictionary<id, user_type> of users that liked this post
     */
    readonly likes = {}
    nrLikes = 0

    constructor(owner_id: string, user_type: string, body: string) {
        this.owner_id = owner_id;
        this.owner_type = user_type
        this.body = body;
    }
}

export default Post