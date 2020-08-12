import {ObjectId} from "mongodb"
import {Error} from "../Structures";

/**
 * default limit value
 */
export const DEFAULT_LIMIT = '20'

/**
 * default skip value
 */
export const DEFAULT_SKIP = '0'

/**
 * auxiliary structure used to query the database
 */
class MongoQuery {

    /**
     * query to be used
     */
    readonly query

    /**
     * options to be used
     */
    readonly options

    constructor(limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP) {
        this.query = {}
        this.options = {limit: parseInt(limit), skip: parseInt(skip), sort: []}
    }

    /**
     * used to query a specific document in the database (by its '_id' field)
     */
    searchById(id: string) {
        if(!ObjectId.isValid(id)) throw new Error(`Invalid id supplied - ${id}`)
        this.query._id = new ObjectId(id)
        return this
    }

    /**
     * searches for a specific value in a certain field
     */
    searchFor(fieldName: string, value) {
        if (value != null && value.trim() != '') this.query[fieldName] = value
        return this
    }

    /**
     * sorts the results given
     */
    sortBy(fieldName: string, asc: boolean) {
        this.options.sort.push([fieldName, asc ? 'asc' : 'desc'])
        return this
    }

    /**
     * uses the text index to query the database
     */
    searchWithTextIndex(value: string) {
        if (value != null && value.trim() != '') this.query.$query = {$text: {$search: value}}
        return this
    }
}

export default MongoQuery