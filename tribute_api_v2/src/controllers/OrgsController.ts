import {handleRequest} from "./RequestHandler";
import {UserType} from "../Structures";
import MiddlewareController from "./MiddlewareController";
import OrgsService from "../service/OrgsService";

/**
 * defines endpoints related to orgs
 */
class OrgsController {

    /**
     * service
     */
    readonly service: OrgsService

    constructor(service: OrgsService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets up routes
     */
    private setupRoutes(router) {
        router.get('/orgs', this.getOrgs)
        router.get('/orgs/:org_id', this.getOrgById)
        router.put('/auth/orgs/:org_id/follow', this.followOrg)
        router.put('/auth/orgs/:org_id', MiddlewareController.orgCheck ,this.updateOrg)
    }

    /**
     * get orgs route handler
     */
    getOrgs = (req, res) => {
        handleRequest(
            () => this.service.getOrgs(req.query.limit, req.query.skip, req.query.name),
            res
        )
    }

    /**
     * get org by id route handler
     */
    getOrgById = (req, res) => {
        handleRequest(
            () => this.service.getOrgById(req.params.org_id),
            res,
            200,
            404
        )
    }

    /**
     * follow org route handler
     */
    followOrg = (req, res) => {
        handleRequest(
            () => this.service.follow(req.user.id, req.user.user_type, req.params.org_id, UserType.Org),
            res,
            201,
        )
    }

    /**
     * update org route handler
     */
    updateOrg = (req, res) => {
        handleRequest(
            () => this.service.updateOrg(req.user.id, req.params.org_id, req.body),
            res,
            201
        )
    }

}

export default OrgsController