import BaseService from "./BaseService";
import {DEFAULT_LIMIT, DEFAULT_SKIP} from "../db/MongoQuery";
import {Error, Status, UserType} from "../Structures";

/**
 * service functions related to volunteers
 */
class VolunteersService extends BaseService {

    /**
     * retrieves volunteers
     */
    getVolunteers(limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP, name: string = null) {
        return BaseService.volunteerRepo.getVolunteers(limit, skip, name)
    }

    /**
     * retrieves a specific volunteer
     */
    getVolunteerById(id: string) {
        return BaseService.volunteerRepo.getVolunteerById(id)
    }

    /**
     * fetches the mail of a volunteer
     */
    async getVolunteerMail(volunteer_id: string) {
        const user = await BaseService.userRepository.getUserById(volunteer_id)
        if (user.user_type != UserType.Volunteer) return Promise.reject(new Error('Invalid user type.'))
        return {mail: user.mail}
    }

    /**
     * updates a volunteer
     */
    async updateVolunteer(user_id: string, volunteer_id: string, updates) {
        if (user_id != volunteer_id) return Promise.reject(new Error(`Unauthorized operation.`))

        const updateResult = await BaseService.volunteerRepo.updateVolunteer(volunteer_id, updates)

        return updateResult.success ?
            new Status('Profile updated', true) :
            Promise.reject(new Error(`Update operation failed.`))
    }

}

export default VolunteersService