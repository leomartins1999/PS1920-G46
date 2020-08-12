import Repository from "./Repository";
import Org from "../../dtos/Org";
import MongoQuery from "../MongoQuery";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'orgs'

/**
 * properties that cannot be changed
 */
const FILTER = ['_id', 'name']

/**
 * descriptors used to create search indexes in the collection
 */
const INDEX_DESCRIPTORS = [{name: 'text'}]

/**
 * streamlines operations within the orgs collection
 */
class OrgRepository {

    /**
     * repository
     */
    private readonly repository: Repository<Org>

    constructor(db_name: string) {
        this.repository = new Repository<Org>(db_name, COLLECTION_NAME, FILTER, INDEX_DESCRIPTORS)
    }

    /**
     * inserts an org in the database
     */
    insertOrg(org: Org) {
        return this.repository.insert(org)
    }

    /**
     * retrieves orgs from the database
     */
    getOrgs(limit: string, skip: string, name: string) {
        const query = new MongoQuery(limit, skip)
            .sortBy('nrFollowers', false)
            .searchWithTextIndex(name)

        return this.repository.select(query)
    }

    /**
     * retrieves a specific org
     */
    getOrgById(id: string) {
        return this.repository.selectById(id)
    }

    /**
     * updates a specific org
     */
    updateOrg(id: string, updates) {
        const query = new MongoQuery()
            .searchById(id)

        return this.repository.update(query, updates)
    }

}

export default OrgRepository