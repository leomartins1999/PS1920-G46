module.exports = () => {
    return {
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

    function invalidParameters(params){
        return create('SERVICE', 'CLIENT', `Invalid Parameter(s): ${params}.`)
    }

    function databaseError(module, collection){
        return create(module, 'SERVER', `Failure inserting into collection ${collection}.`);
    }

    function unknownUrl(url){
        return create(module, 'API', `Unknown url ${url}.`)
    }
};
