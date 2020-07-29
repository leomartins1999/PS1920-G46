// dependencies
const randomstring = require("randomstring");
const stringHash = require('@sindresorhus/string-hash');

const HASH_LENGTH = 8;
const DB_NAME = 'tribute_db';
const COLLECTION_NAME = 'auth';

// repo
const repo = require('../repository/T-repository')(DB_NAME,COLLECTION_NAME);

module.exports = () => {
    return {
        register: register,
        get: get,
        getById: getById,
        remove: remove
    };

    /**
     * Generates salt and hash to be stored in the database and stores the data
     * @param registerParams RegisterParams object
     * @returns {Promise<Promise>} resolves if successful, with ID
     * rejects with error otherwise
     */
    function register(registerParams){
        const salt = randomstring.generate(HASH_LENGTH);
        const hash = stringHash(`${registerParams.password}${salt}`);

        const obj = {
            email: registerParams.email,
            salt: salt,
            hash: hash,
            user_type: registerParams.user_type
        };

        return repo.insert(obj);
    }

    /**
     * Retrieves the corresponding document
     * @param query_options Query Options object
     * @param authDetails Service Params object, containing user's email
     * @returns {Promise<Promise | void | any[]>} resolves if successful, with user's
     * authentication details
     * rejects with error otherwise
     */
    function get(query_options, authDetails){
        query_options.searchFor('email', authDetails.email);

        return repo.select(query_options)
            .then(res => res[0]);
    }

    function getById(query_options, id){
        return repo.selectById(query_options, id)
    }

    /**
     * Removes the document referenced by the ID
     * @param id id of document to be removed
     * @returns {Promise<Promise>} Resolves if successful, with status message
     * rejects with error otherwise
     */
    function remove(id){
        return repo.removeById(id);
    }
};