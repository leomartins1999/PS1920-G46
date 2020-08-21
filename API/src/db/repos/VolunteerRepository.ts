import Repository from "./Repository";
import Volunteer from "../../dtos/Volunteer";
import MongoQuery from "../MongoQuery";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'volunteers'

/**
 * properties that cannot be changed
 */
const FILTER = ['_id', 'name']

/**
 * descriptors used to create search indexes in the collection
 */
const INDEX_DESCRIPTORS = [{name: 'text'}]

/**
 * streamlines operations within the volunteers collection
 */
class VolunteerRepository {

    /**
     * repository
     */
    private readonly repository: Repository<Volunteer>

    constructor(db_name: string) {
        this.repository = new Repository(db_name, COLLECTION_NAME, FILTER, INDEX_DESCRIPTORS)
    }

    /**
     * inserts volunteer in the collection
     */
    insertVolunteer(volunteer: Volunteer) {
        return this.repository.insert(volunteer)
    }

    /**
     * retrieves volunteers from the database
     */
    getVolunteers(limit: string, skip: string, name: string) {
        const query = new MongoQuery(limit, skip)
            .sortBy('nrFollowers', false)
            .searchWithTextIndex(name)

        return this.repository.select(query)
    }

    /**
     * retrieves specific volunteer
     */
    getVolunteerById(id: string) {
        return this.repository.selectById(id)
    }

    /**
     * updates a specific volunteer
     */
    updateVolunteer(id: string, updates) {
        const query = new MongoQuery()
            .searchById(id)

        return this.repository.update(query, updates)
    }

}

export default VolunteerRepository