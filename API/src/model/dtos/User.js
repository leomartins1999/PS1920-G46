/**
 * Representation of an user session
 */
class User{

    /**
     * Primary constructer
     * @param user_id user's id
     * @param user_type user's type
     */
    constructor(user_id, user_type){
        this.user_id = user_id;
        this.user_type = user_type
    }

}

module.exports = User;