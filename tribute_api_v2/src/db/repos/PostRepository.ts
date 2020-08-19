import Repository from "./Repository";
import Post from "../../dtos/Post";
import MongoQuery from "../MongoQuery";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'posts'

/**
 * properties that cannot be changed
 */
const FILTER = ['_id', 'owner_id', 'time']

/**
 * streamlines operations within the posts collection
 */
class PostRepository {

    /**
     * repository
     */
    private readonly repository: Repository<Post>

    constructor(db_name: string) {
        this.repository = new Repository(db_name, COLLECTION_NAME, FILTER)
    }

    /**
     * inserts a post in the collection
     */
    insertPost(post: Post) {
        return this.repository.insert(post)
    }

    /**
     * retrieves posts which owners are contained in the given array
     */
    getPostsForOwners(limit: string, skip: string, ids: Array<string>){
        if (ids.length === 0) return Promise.resolve([])

        const query = new MongoQuery(limit, skip)
            .filterInArray('owner_id', ids)
            .sortBy('time', false)

        return this.repository.select(query)
    }

    /**
     * retrieves posts from the collection
     */
    getPosts(limit: string, skip: string, owner_id: string) {
        const query = new MongoQuery(limit, skip)
            .searchFor('owner_id', owner_id)
            .sortBy('time', false)

        return this.repository.select(query)
    }

    /**
     * retrieves a specific post
     */
    getPostById(id: string) {
        return this.repository.selectById(id)
    }

    /**
     * updates a specific post
     */
    updatePost(id: string, post: Post) {
        const query = new MongoQuery()
            .searchById(id)

        return this.repository.update(query, post)
    }
}

export default PostRepository