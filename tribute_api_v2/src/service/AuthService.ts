const hash = require('@sindresorhus/fnv1a')

import BaseService from "./BaseService";
import Volunteer from "../dtos/Volunteer";
import {Error, Session, UserType} from "../Structures";
import User from "../dtos/User";
import Org from "../dtos/Org";

/**
 * service functions related to authentication
 */
class AuthService extends BaseService{

    /**
     * registers volunteer
     */
    async registerVolunteer(mail: string, password: string, volunteer: Volunteer) {
        const users = await BaseService.userRepository.getUserByMail(mail)
        if (users.length > 0) return Promise.reject(new Error('User already registered with this email.'))

        const id = await BaseService.userRepository.insertUser(new User(mail, password, UserType.Volunteer))

        volunteer.setId(id)
        return BaseService.volunteerRepo.insertVolunteer(volunteer)
    }

    /**
     * registers org
     */
    async registerOrg(mail: string, password: string, org: Org) {
        const users = await BaseService.userRepository.getUserByMail(mail)
        if (users.length > 0) return Promise.reject(new Error('User already registered with this email.'))

        const id = await BaseService.userRepository.insertUser(new User(mail, password, UserType.Org))
        org.setId(id)

        return BaseService.orgRepo.insertOrg(org)
    }

    /**
     * determines success of login operation
     */
    async login(mail: string, password: string) {
        const users = await BaseService.userRepository.getUserByMail(mail)
        if (users.length <= 0) return Promise.reject(new Error('Mail not associated with any account.'))

        const user = users[0]
        if (user.hash !== hash(`${password}${user.salt}`)) return Promise.reject(new Error('Invalid password.'))

        return new Session(user._id, user.user_type)
    }

}

export default AuthService