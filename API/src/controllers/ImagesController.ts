import {handleError, handleRequest} from "./RequestHandler";
import ImagesService from "../service/ImagesService";

/**
 * defines endpoints related to images
 */
class ImagesController {

    /**
     * service
     */
    readonly service: ImagesService

    constructor(service: ImagesService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets up routes
     */
    private setupRoutes(router){
        router.get('/images/:type/:id', this.getImage)
        router.put('/auth/images/volunteers/:volunteer_id', this.updateVolunteerImage)
        router.put('/auth/images/orgs/:org_id', this.updateOrgImage)
        router.put('/auth/images/posts/:post_id', this.updatePostImage)
        router.put('/auth/images/events/:event_id', this.updateEventImage)
    }

    /**
     * ends response object with image content
     */
    private static sendImage(res, body){
        res.statusCode = 200
        res.end(body)
    }

    /**
     * get image route handler
     */
    getImage = (req, res) => {
        try{
            this.service
                .getImage(req.params.type, req.params.id)
                .then(body => ImagesController.sendImage(res, body))
                .catch(err => handleError(res, 404, err))
        }catch (e) {
            handleError(res, 500, e)
        }
    }

    /**
     * update volunteer image route handler
     */
    updateVolunteerImage = (req, res) => {
        handleRequest(
            () => this.service.updateVolunteerImage(req.user.id, req.params.volunteer_id, req.body.data),
            res,
            201,
        )
    }

    /**
     * update org image route handler
     */
    updateOrgImage = (req, res) => {
        handleRequest(
            () => this.service.updateOrgImage(req.user.id, req.params.org_id, req.body.data),
            res,
            201,
        )
    }

    /**
     * update post image route handler
     */
    updatePostImage = (req, res) => {
        handleRequest(
            () => this.service.updatePostImage(req.user.id, req.params.post_id, req.body.data),
            res,
            201,
        )
    }

    /**
     * update event image route handler
     */
    updateEventImage = (req, res) => {
        handleRequest(
            () => this.service.updateEventImage(req.user.id, req.params.event_id, req.body.data),
            res,
            201,
        )
    }

}

export default ImagesController