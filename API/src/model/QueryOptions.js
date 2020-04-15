const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;

class QueryOptions {

    constructor(limit, skip) {
        this.query = {};

        this.options = {
            limit: limit? parseInt(limit): DEFAULT_LIMIT,
            skip: skip? parseInt(skip): DEFAULT_SKIP
        }
    }

    searchFor(fieldName, value){
        this.query[fieldName] = value;
        return this
    }

    searchById(id){
        return this.searchFor('id', id);
    }

    similarTo(value){
        this.query = {
            $query: {$text: {$search: value}}
        };
        return this
    }

    sortBy(fieldName, asc){
        this.options.sort = [[fieldName, asc? 'asc': 'desc']];
        return this
    }

}

module.exports = QueryOptions;