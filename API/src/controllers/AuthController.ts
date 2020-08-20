import {handleError, handleRequest, handleSuccess} from "./RequestHandler";
import Org from "../dtos/Org";
import Volunteer from "../dtos/Volunteer";
import {Status} from "../Structures";
import AuthService from "../service/AuthService";

/**
 * defines endpoints related to authentication
 */
class AuthController {

    /**
     * service
     */
    readonly service: AuthService

    constructor(service: AuthService, router) {
        this.service = service;

        this.setupRoutes(router)
    }

    /**
     * sets routes
     */
    private setupRoutes(router) {
        router.post('/register', this.register)
        router.post('/login', this.login)
        router.get('/logout', this.logout)
    }

    /**
     * register route handler
     */
    private register = (req, res) => {
        handleRequest(
            () => req.body.user_type === 'volunteer' ?
                this.service.registerVolunteer(req.body.mail, req.body.password, new Volunteer(req.body.data)) :
                this.service.registerOrg(req.body.mail, req.body.password, new Org(req.body.data)),
            res,
            201
        )
    }

    /**
     * login route handler
     */
    private login = (req, res) => {
        try {
            this.service.login(req.body.mail, req.body.password)
                .then(session => req.login(session, _ => handleSuccess(res, 200, {user_details: req.user})))
                .catch(err => handleError(res, 400, err))
        } catch (e) {
            handleError(res, 500, e)
        }
    }

    /**
     * logout route handler
     */
    private logout = (req, res) => {
        try{
            req.logout()
            handleSuccess(res, 200, new Status('Logout completed.', true))
        }catch (e) {
            handleError(res, 500, e)
        }
    }

}

export default AuthController