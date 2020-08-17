import {Error, getImageTypeForString, ImageType, Status} from "../Structures";
import BaseService from "./BaseService";

/**
 * service function related to images
 */
class ImagesService extends BaseService {

    /**
     * updates an image in the database
     */
    private static async setImage(type: ImageType, id: string, body) {
        if (body == null) return Promise.reject('No image supplied.')

        const image = new Buffer(
            body.slice(body.indexOf(','), body.length),
            'base64'
        )

        const updateResult = await
            BaseService.imageRepository.setImage(type, id, image)

        return updateResult.success ?
            new Status('Image updated', true) :
            Promise.reject(new Error(`Set image operation failed.`))
    }

    /**
     * updates a volunteer's image
     */
    async updateVolunteerImage(user_id: string, volunteer_id: string, body) {
        if (user_id != volunteer_id) return Promise.reject('Unauthorized operation.')

        return ImagesService.setImage(ImageType.Volunteer, volunteer_id, body)
    }

    /**
     * updates an org's image
     */
    async updateOrgImage(user_id: string, org_id: string, body) {
        if (user_id != org_id) return Promise.reject('Unauthorized operation.')

        return ImagesService.setImage(ImageType.Org, org_id, body)
    }

    /**
     * updates a post's image
     */
    async updatePostImage(user_id: string, post_id: string, body) {
        const post = await BaseService.postRepo.getPostById(post_id)
        if (post.owner_id != user_id) return Promise.reject('Unauthorized operation.')

        return ImagesService.setImage(ImageType.Post, post_id, body)
    }

    /**
     * updates an event's image
     */
    async updateEventImage(user_id: string, event_id: string, body) {
        const event = await BaseService.eventRepository.getEventById(event_id)
        if (event.owner_id != user_id) return Promise.reject('Unauthorized operation.')

        return ImagesService.setImage(ImageType.Event, event_id, body)
    }

    /**
     * retrieves an image
     */
    getImage(type: string, id: string) {
        return BaseService.imageRepository.getImageById(getImageTypeForString(type), id)
    }

}

export default ImagesService