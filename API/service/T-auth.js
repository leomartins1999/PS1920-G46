// dependencies
const randomstring = require("randomstring");
const stringHash = require('@sindresorhus/string-hash');

const HASH_LENGTH = 8;
const COLLECTION_NAME = 'auth';

// repo
const repo = require('./T-repository')(COLLECTION_NAME);

module.exports = () => {
    return {
        register: register,
        get: get,
        remove: remove
    };

    function register(authDetails){
        const salt = randomstring.generate(HASH_LENGTH);
        const hash = stringHash(`${authDetails.password}${salt}`);

        const obj = {
            email: authDetails.email,
            salt: salt,
            hash: hash,
            user_type: authDetails.user_type
        };

        return repo.insert(obj);
    }

    function get(authDetails){
        const query = {
            email: authDetails.email
        };

        return repo.select(query)
            .then(res => res[0]);
    }

    function remove(id){
        return repo.removeById(id);
    }
};