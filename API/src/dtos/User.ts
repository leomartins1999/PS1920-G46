const randomStr = require('randomstring')
const hash = require('@sindresorhus/fnv1a')

const SALT_LENGTH = 8

class User {

    _id: string
    readonly mail: string
    /**
     * hash of salted password
     */
    readonly hash: string
    readonly salt: string
    readonly user_type: string;

    constructor(mail: string, password: string, user_type: string) {
        this.mail = mail
        this.salt = randomStr.generate(SALT_LENGTH)// generate salt randomly
        this.hash = hash(`${password}${this.salt}`)// generate hash from password
        this.user_type = user_type
    }

}

export default User