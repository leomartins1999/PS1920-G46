import Repository from "./Repository";
import User from "../../dtos/User";
import MongoQuery from "../MongoQuery";

/**
 * name of database collection
 */
const COLLECTION_NAME = 'user'

/**
 * streamlines operations within the events collection
 */
class UserRepository {

    /**
     * repository
     */
    private readonly repository: Repository<User>

    constructor(db_name: string) {
        this.repository = new Repository(db_name, COLLECTION_NAME)
    }

    /**
     * inserts user in the collection
     */
    insertUser(user: User){
        return this.repository.insert(user)
    }

    /**
     * retrieves a specific user (by its id)
     */
    getUserById(id: string){
        return this.repository.selectById(id)
    }

    /**
     * retrieves a specific user (by its mail)
     */
    getUserByMail(mail: string){
        const query = new MongoQuery()
            .searchFor('mail', mail)

        return this.repository.select(query)
    }

}

export default UserRepository