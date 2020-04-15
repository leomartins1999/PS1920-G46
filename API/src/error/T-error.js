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

    function create(module, type, message){
        return {
            module: module,
            type: type,
            message: message
        }
    }

    function fileNotFound(type, id){
        return create('API', 'CLIENT', `The requested file was not found: {type: ${type}, id: ${id}}`)
    }

    function authenticationError(message){
        return create('SERVICE', 'CLIENT', message);
    }

    function invalidParameters(params){
        return create('SERVICE', 'CLIENT', `Invalid Parameter(s): ${params}.`)
    }

    function databaseError(collection, operation){
        return create('DATABASE', 'SERVER', `Failure while operating within ${collection} (${operation}).`);
    }

    function unknownUrl(url){
        return create('API', 'CLIENT', `Unknown url ${url}.`)
    }

    function serviceError(message){
        return create('SERVICE', 'CLIENT', message);
    }

    function unauthorizedAccess(){
        return create('SERVICE', 'CLIENT', 'Unauthorized.')
    }
};
