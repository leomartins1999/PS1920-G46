const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;

/**
 * Representation of the query given to the database
 * to be executed (contains the query and options)
 */
class MongoQuery {

    /**
     * Standard constructor
     * @param limit number of elements to be retrieved
     * @param skip number of elements to be skipped
     */
    constructor(limit, skip) {
        this.query = {};

        this.options = {
            limit: limit? parseInt(limit): DEFAULT_LIMIT,
            skip: skip? parseInt(skip): DEFAULT_SKIP
        }
    }

    /**
     * Queries the database for an exact value in a specific property
     * @param fieldName field to execute the search within
     * @param value value to be searched for
     * @returns {MongoQuery} this instance
     */
    searchFor(fieldName, value){
        this.query[fieldName] = value;
        return this
    }

    /**
     * Queries the database for a document
     * @param id the document's id
     * @returns {MongoQuery} this instance
     */
    searchById(id){
        return this.searchFor('id', id);
    }

    /**
     * Queries the database using a search index, looking for
     * an exact or similar value to the one given
     * @param value given value
     * @returns {MongoQuery} this instance
     */
    similarTo(value){
        this.query = {
            $query: {$text: {$search: value}}
        };
        return this
    }

    /**
     * Queries the database to sort the results based on a
     * specific field
     * @param fieldName the field's name
     * @param asc true if results are to be ascending, false if the results
     * are to be descending
     * @returns {MongoQuery} this instance
     */
    sortBy(fieldName, asc){
        this.options.sort = [[fieldName, asc? 'asc': 'desc']];
        return this
    }

}

module.exports = MongoQuery;