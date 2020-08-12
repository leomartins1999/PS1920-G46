import {handleRequest} from "./RequestHandler";
import {UserType} from "../Structures";
import MiddlewareController from "./MiddlewareController";
import VolunteersService from "../service/VolunteersService";

/**
 * defines endpoints related to volunteer
 */
class VolunteersController {

    /**
     * service
     */
    readonly service: VolunteersService

    constructor(service: VolunteersService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets routes
     */
    private setupRoutes(router) {
        router.get('/volunteers', this.getVolunteers)
        router.get('/volunteers/:volunteer_id', this.getVolunteerById)
        router.get('/auth/volunteers/:volunteer_id/mail', MiddlewareController.orgCheck, this.getVolunteerMail)
        router.put('/auth/volunteers/:volunteer_id/follow', this.followVolunteer)
        router.put('/auth/volunteers/:volunteer_id', MiddlewareController.volunteerCheck ,this.updateVolunteer)
    }

    /**
     * get volunteers route handler
     */
    getVolunteers = (req, res) => {
        handleRequest(
            () => this.service.getVolunteers(req.query.limit, req.query.skip, req.query.name),
            res
        )
    }

    /**
     * get volunteer by id route handler
     */
    getVolunteerById = (req, res) => {
        handleRequest(
            () => this.service.getVolunteerById(req.params.volunteer_id),
            res,
            200,
            404
        )
    }

    /**
     * get mail of volunteer route handler
     */
    getVolunteerMail = (req, res) => {
        handleRequest(
            () => this.service.getVolunteerMail(req.params.volunteer_id),
            res,
            200,
            404
        )
    }

    /**
     * follow volunteer route handler
     */
    followVolunteer = (req, res) => {
        handleRequest(
            () => this.service.follow(req.user.id, req.user.user_type, req.params.volunteer_id, UserType.Volunteer),
            res,
            201
        )
    }

    /**
     * update volunteer route handler
     */
    updateVolunteer = (req, res) => {
        handleRequest(
            () => this.service.updateVolunteer(req.user.id, req.params.volunteer_id, req.body),
            res,
            201,
            401
        )
    }

}

export default VolunteersController