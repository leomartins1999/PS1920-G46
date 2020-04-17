module.exports = () => {
    return {
        fileNotFound: fileNotFound,
        authenticationError: authenticationError,
        invalidParameters: invalidParameters,
        databaseError: databaseError,
        unknownUrl: unknownUrl,
        serviceError: serviceError,
        unauthorizedAccess: unauthorizedAccess
    };

    /**
     * Error constructor
     * @param module module in which the error was thrown
     * @param type
     * @param message
     * @returns {{module: *, type: *, message: *}}
     */
    function create(module, type, message){
        return {
            module: module,
            type: type,
            message: message
        }
    }

    /**
     * error shown when the requested file was not found
     * @param type file type (volunteers, orgs, events, posts)
     * @param id file id
     * @returns {{module: *, type: *, message: *}}
     */
    function fileNotFound(type, id){
        return create('API', 'CLIENT', `The requested file was not found: {type: ${type}, id: ${id}}`)
    }

    /**
     * Error shown when the authorization aspect of an operation fails
     * @param message description
     * @returns {{module: *, type: *, message: *}}
     */
    function authenticationError(message){
        return create('SERVICE', 'CLIENT', message);
    }

    /**
     * Error shown when a supplied param to the API is invalid(or does not exist)
     * @param params Parameter(s) that is invalid
     * @returns {{module: *, type: *, message: *}}
     */
    function invalidParameters(params){
        return create('SERVICE', 'CLIENT', `Invalid Parameter(s): ${params}.`)
    }

    /**
     * Error shown when, while processing a request, a database error occurred.
     * @param collection collection in which the error occurred
     * @param operation operation that was being executed
     * @returns {{module: *, type: *, message: *}}
     */
    function databaseError(collection, operation){
        return create('DATABASE', 'SERVER', `Failure while operating within ${collection} (${operation}).`);
    }

    /**
     * Error shown when there is not an associated endpoint with the supplied URL.
     * @param url Invalid URL
     * @returns {{module: *, type: *, message: *}}
     */
    function unknownUrl(url){
        return create('API', 'CLIENT', `Unknown url ${url}.`)
    }

    /**
     * Error shown while processing the request in the service layer
     * @param message description of error
     * @returns {{module: *, type: *, message: *}}
     */
    function serviceError(message){
        return create('SERVICE', 'CLIENT', message);
    }

    /**
     * Error shown when user calls an operation that it doesn't have access to perform.
     * @returns {{module: *, type: *, message: *}}
     */
    function unauthorizedAccess(){
        return create('SERVICE', 'CLIENT', 'Unauthorized.')
    }
};
