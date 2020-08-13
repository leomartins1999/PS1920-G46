import BaseService from "./BaseService";
import {DEFAULT_LIMIT, DEFAULT_SKIP} from "../db/MongoQuery";
import Post from "../dtos/Post";
import {Error, Status} from "../Structures";

/**
 * service functions related to posts
 */
class PostsService extends BaseService{

    /**
     * retrieves posts
     */
    getPosts(limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP, owner_id: string) {
        return BaseService.postRepo.getPosts(limit, skip, owner_id)
    }

    /**
     * adds a post
     */
    addPost(owner_id: string, description: string) {
        return BaseService.postRepo.insertPost(new Post(owner_id, description))
    }

    /**
     * likes post
     */
    async likePost(user_id: string, user_type: string, post_id: string) {
        const post = await BaseService.postRepo.getPostById(post_id)

        if (post.likes[user_id]) delete post.likes[user_id]
        else post.likes[user_id] = user_type
        post.nrLikes = Object.keys(post.likes).length

        const updateResult = await BaseService.postRepo.updatePost(post_id, post)

        return updateResult.success ?
            new Status('Like was changed.', true) :
            Promise.reject(new Error('Like operation has failed.'))
    }

}

export default PostsService