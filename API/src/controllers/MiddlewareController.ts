import {handleError} from "./RequestHandler";
import {Error} from "../Structures";

/**
 * defines api middlewares used to restrict access of users to endpoints
 */
class MiddlewareController {

    constructor(router) {
        this.setupMiddlewares(router)
    }

    /**
     * sets up middlewares
     */
    private setupMiddlewares(router) {
        router.use('/auth', this.authenticationCheck)
    }

    /**
     * checks if user is org
     */
    static orgCheck(req, res, next) {
        req.user.user_type === 'org' ? next() : handleError(res, 401, new Error('This endpoint requires authentication by an org.'))
    }

    /**
     * checks if user is volunteer
     */
    static volunteerCheck(req, res, next) {
        req.user.user_type === 'volunteer' ? next() : handleError(res, 401, new Error('This endpoint requires authentication by a volunteer.'))
    }

    /**
     * checks if user is authenticated
     */
    authenticationCheck = (req, res, next) => {
        req.user ? next() : handleError(res, 401, new Error('This endpoint requires authentication.'))
    }

}

export default MiddlewareController