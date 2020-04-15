const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 0;

class QueryOptions {

    constructor(limit, skip) {
        this.query = {};

        this.options = {
            limit: limit? limit: DEFAULT_LIMIT,
            skip: skip? skip: DEFAULT_SKIP
        }
    }

    searchByValue(value){
        this.query = {
            $query: {$text: {$search: value}}
        }
    }

    sortBy(fieldName, asc){
        this.addOption('sort', [[fieldName][asc? 'asc': 'desc']])
    }

    addOption(name, option){
        this.options[name] = option
    }

}

module.exports = QueryOptions;