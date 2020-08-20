import BaseService from "./BaseService";
import {DEFAULT_LIMIT, DEFAULT_SKIP} from "../db/MongoQuery";
import {Error, Status} from "../Structures";

/**
 * service function related to orgs
 */
class OrgsService extends BaseService{

    /**
     * retrieves orgs
     */
    getOrgs(limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP, name = null) {
        return BaseService.orgRepo.getOrgs(limit, skip, name)
    }

    /**
     * retrieves a specific org
     */
    getOrgById(id: string) {
        return BaseService.orgRepo.getOrgById(id)
    }

    /**
     * updates an org
     */
    async updateOrg(user_id: string, org_id: string, updates) {
        if (user_id != org_id) return Promise.reject(new Error(`Unauthorized operation.`))

        const updateResult = await BaseService.orgRepo.updateOrg(org_id, updates)

        return updateResult.success ?
            new Status('Profile updated', true) :
            Promise.reject(new Error(`Update operation failed.`))
    }

}

export default OrgsService