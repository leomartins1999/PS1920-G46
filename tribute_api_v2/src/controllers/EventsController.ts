import {handleRequest} from "./RequestHandler";
import MiddlewareController from "./MiddlewareController";
import EventsService from "../service/EventsService";

/**
 * defines endpoints related to events
 */
class EventsController {

    /**
     * service
     */
    readonly service: EventsService

    constructor(service: EventsService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets routes
     */
    private setupRoutes(router) {
        router.get('/events', this.getEvents)
        router.get('/auth/events', this.getEventsForUser)
        router.get('/events/:event_id', this.getEventById)
        router.post('/auth/events', MiddlewareController.orgCheck, this.addEvent)
        router.put('/auth/events/:event_id/interested', MiddlewareController.volunteerCheck, this.interestedInEvent)
        router.put('/auth/events/:event_id/', MiddlewareController.orgCheck, this.updateEvent)
    }

    /**
     * get events route handler
     */
    getEvents = (req, res) => {
        handleRequest(
            () => this.service.getEvents(req.query.limit, req.query.skip, req.query.owner_id),
            res
        )
    }

    getEventsForUser = (req, res) => {
        handleRequest(
            () => this.service.getEventsForUser(req.user.id, req.user.user_type, req.query.limit, req.query.skip),
            res
        )
    }

    /**
     * get event by id route handler
     */
    getEventById = (req, res) => {
        handleRequest(
            () => this.service.getEventById(req.params.event_id),
            res,
            200,
            404
        )
    }

    /**
     * add event route handler
     */
    addEvent = (req, res) => {
        handleRequest(
            () => this.service.addEvent(
                req.user.id, req.body.name, req.body.description, req.body.date, req.body.location
            ),
            res,
            201
        )
    }

    /**
     * interested in event route handler
     */
    interestedInEvent = (req, res) => {
        handleRequest(
            () => this.service.interestedInEvent(req.user.id, req.params.event_id),
            res,
            201
        )
    }

    /**
     * update event route handler
     */
    updateEvent = (req, res) => {
        handleRequest(
            () => this.service.updateEvent(req.user.id, req.params.event_id, req.body),
            res
        )
    }

}

export default EventsController