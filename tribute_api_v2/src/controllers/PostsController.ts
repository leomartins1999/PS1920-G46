import {handleRequest} from "./RequestHandler";
import PostsService from "../service/PostsService";

/**
 * defines endpoints related to posts
 */
class PostsController {

    /**
     * service
     */
    readonly service: PostsService

    constructor(service: PostsService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets routes
     */
    private setupRoutes(router) {
        router.get('/posts', this.getPosts)
        router.post('/auth/posts', this.addPost)
        router.put('/auth/posts/:post_id/like', this.likePost)
    }

    /**
     * get posts route handler
     */
    getPosts = (req, res) => {
        handleRequest(
            () => this.service.getPosts(req.query.limit, req.query.skip, req.query.owner_id),
            res
        )
    }

    /**
     * add post route handler
     */
    addPost = (req, res) => {
        handleRequest(
            () => this.service.addPost(req.user.id, req.body.body),
            res,
            201
        )
    }

    /**
     * like post route handler
     */
    likePost = (req, res) => {
        handleRequest(
            () => this.service.likePost(req.user.id, req.user.user_type, req.params.post_id),
            res,
            201
        )
    }

}

export default PostsController