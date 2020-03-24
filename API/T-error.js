module.exports = () => {
    return {
        authenticationError: authenticationError,
        invalidParameters: invalidParameters,
        databaseError: databaseError,
        unknownUrl: unknownUrl
    };

    function create(module, type, message){
        return {
            module: module,
            type: type,
            message: message
        }
    }

    function authenticationError(message){
        return create('SERVICE', 'CLIENT', message);
    }

    function invalidParameters(params){
        return create('SERVICE', 'CLIENT', `Invalid Parameter(s): ${params}.`)
    }

    function databaseError(module, collection){
        return create('DATABASE', 'SERVER', `Failure inserting into collection ${collection}.`);
    }

    function unknownUrl(url){
        return create('API', 'CLIENT', `Unknown url ${url}.`)
    }
};
