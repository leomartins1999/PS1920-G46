import VolunteerRepository from "../db/repos/VolunteerRepository";
import OrgRepository from "../db/repos/OrgRepository";
import PostRepository from "../db/repos/PostRepository";
import EventRepository from "../db/repos/EventRepository";
import ImageRepository from "../db/repos/ImageRepository";
import UserRepository from "../db/repos/UserRepository";
import {Error, Status, UserType} from "../Structures";

const DB_NAME = 'tribute_db_test'

/**
 * base service class, containing references to instances of
 * repositories and other common functions
 */
abstract class BaseService {

    static readonly volunteerRepo = new VolunteerRepository(DB_NAME)
    static readonly orgRepo = new OrgRepository(DB_NAME)
    static readonly postRepo = new PostRepository(DB_NAME)
    static readonly eventRepository = new EventRepository(DB_NAME)
    static readonly imageRepository = new ImageRepository(DB_NAME)
    static readonly userRepository = new UserRepository(DB_NAME)

    /**
     * returns get by id and update functions depending on user type
     */
    private userOperations(user_type: string) {
        return user_type === UserType.Org ? {
            get: (id) => BaseService.orgRepo.getOrgById(id),
            update: (id, updates) => BaseService.orgRepo.updateOrg(id, updates)
        } : {
            get: (id) => BaseService.volunteerRepo.getVolunteerById(id),
            update: (id, updates) => BaseService.volunteerRepo.updateVolunteer(id, updates)
        }
    }

    /**
     * retrieves ids of users being followed by given user
     */
    async getIdsOfFollowing(id, user_type) {
        const user = await this.userOperations(user_type)
            .get(id)

        const ids = []
        for (let following_id of Object.keys(user.following)) {
            console.log(following_id)
            ids.push(following_id)
        }

        return ids
    }

    /**
     * user A(follower) follows user B(followed)
     * @param follower_id
     * @param follower_user_type
     * @param followed_id
     * @param followed_user_type
     */
    async follow(
        follower_id: string,
        follower_user_type: string,
        followed_id: string,
        followed_user_type: string
    ) {
        if (follower_id === followed_id) return Promise.reject(new Error('User can\'t follow itself.'))

        // getting associated operations
        const follower_operations = this.userOperations(follower_user_type)
        const followed_operations = this.userOperations(followed_user_type)

        // fetching followed
        const followed = await followed_operations.get(followed_id)

        // fetching follower
        const follower = await follower_operations.get(follower_id)

        // setting fields
        if (followed.followers[follower_id]) delete followed.followers[follower_id]
        else followed.followers[follower_id] = follower_user_type
        if (follower.following[followed_id]) delete follower.following[followed_id]
        else follower.following[followed_id] = followed_user_type

        // updating counts
        followed.nrFollowers = Object.keys(followed.followers).length
        follower.nrFollowing = Object.keys(follower.following).length

        // updating entries
        const followedUpdate = await followed_operations.update(followed_id, followed)
        const followerUpdate = await follower_operations.update(follower_id, follower)

        return followerUpdate.success && followedUpdate.success ?
            new Status('Follow was changed.', true) :
            Promise.reject(new Error('Follow operation was unsuccessful.'))
    }

}

export default BaseService