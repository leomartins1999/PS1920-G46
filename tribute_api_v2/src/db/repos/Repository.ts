import {MongoClient} from 'mongodb'
import MongoQuery from "../MongoQuery";
import {Error, Id, Status} from "../../Structures";

/**
 * mongodb database connection string
 */
const URL = 'mongodb://localhost:27017/'

// instantiation of mongo client
const client = MongoClient

/**
 * Class responsible for handling all operation within a specific
 * database collection
 */
class Repository<T> {

    /**
     * name of database to be accessed
     */
    private readonly db_name: string;

    /**
     * name of collection to be accessed
     */
    private readonly collection_name: string;

    /**
     * properties in documents that cannot be changed
     */
    private readonly filter: string[]

    constructor(db_name: string, collection_name: string, filter: string[] = [], indexDescriptors = []) {
        this.db_name = db_name
        this.collection_name = collection_name
        this.filter = filter

        // create search indexes
        for (const descriptor of indexDescriptors)
            this.createSearchIndex(descriptor)
    }

    /**
     * attempts to establish connection to database, returns collection
     */
    private accessCollection() {
        return client.connect(URL)
            .then(db => db.db(this.db_name))
            .then(dbo => dbo.collection(this.collection_name))
    }

    /**
     * creates a search index based on the given descriptor
     */
    private createSearchIndex(descriptor) {
        this.accessCollection()
            .then(col => col.createIndex(descriptor))
            .then(_ => console.log(`Success creating index for ${this.collection_name}`))
            .catch(err => console.log(`Error creating index for ${this.collection_name} - ${err}`))
    }

    /**
     * applies filter to updates to be made in object so that some fields cannot be changed
     */
    private applyFilter(update) {
        for (const prop of this.filter)
            delete update[prop]

        return update
    }

    /**
     * inserts a new document in the collection
     */
    insert(object: T): Promise<Id> {
        return this.accessCollection()
            .then(col => col.insertOne(object))
            .then(res => res.result.ok ?
                Promise.resolve(new Id(res.insertedId)) :
                Promise.reject(new Error(`Insert failed on ${this.collection_name}`)))
    }

    /**
     * select documents from the collection using the given query
     */
    select(query: MongoQuery = new MongoQuery()): Promise<T[]> {
        return this.accessCollection()
            .then(col => col.find(query.query, query.options).toArray())
    }

    /**
     * selects a specific document by its id
     */
    async selectById(id: string): Promise<T>{
        const query = new MongoQuery()
            .searchById(id)

        const results = await this.select(query)
        if (results.length <= 0) return Promise.reject(new Error(`Entity with id ${id} not found.`))

        return results[0]
    }

    /**
     * updates selected documents of the collection
     */
    update(query: MongoQuery, update): Promise<Status> {
        return this.accessCollection()
            .then(col => col.updateMany(query.query, {$set: this.applyFilter(update)}, {upsert: true}))
            .then(res => res.matchedCount > 0 || res.upsertedCount > 0 ?
                Promise.resolve(new Status('success', true)) :
                Promise.reject(new Error(`Update failed on ${this.collection_name} for ${query}`))
            )
    }

    /**
     * removes selected documents of the collection
     */
    remove(query: MongoQuery): Promise<Status> {
        return this.accessCollection()
            .then(col => col.deleteMany(query.query))
            .then(res => res.result.ok ?
                Promise.resolve(new Status('success', true)) :
                Promise.reject(new Error(`Delete failed on ${this.collection_name} for ${query}`))
            )
    }
}

export default Repository