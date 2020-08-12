import Repository from "./Repository";
import MongoQuery from "../MongoQuery";
import Event from "../../dtos/Event";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'events'

/**
 * properties that cannot be changed
 */
const FILTER = ['_id', 'owner_id', 'name']

/**
 * streamlines operations within the events collection
 */
class EventRepository{

    /**
     * repository
     */
    private readonly repository: Repository<Event>

    constructor(db_name: string) {
        this.repository = new Repository(db_name, COLLECTION_NAME, FILTER)
    }

    /**
     * inserts an event in the collection
     */
    insertEvent(event: Event){
        return this.repository.insert(event)
    }

    /**
     * gets events from collection
     */
    getEvents(limit: string, skip: string, owner_id: string){
        const query = new MongoQuery(limit, skip)
            .searchFor('owner_id', owner_id)
            .sortBy('date', false)

        return this.repository.select(query)
    }

    /**
     * gets a specific event
     */
    getEventById(id: string){
        return this.repository.selectById(id)
    }

    /**
     * updates a specific event
     */
    updateEvent(id: string, updates){
        const query = new MongoQuery()
            .searchById(id)

        return this.repository.update(query, updates)
    }

}

export default EventRepository