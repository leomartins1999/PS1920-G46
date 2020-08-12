import {Id} from "../Structures";

class Volunteer {

    _id: string
    readonly name: string
    readonly description: string
    readonly linkedinLink: string
    /**
     * dictionary<id, user_type> composed by users followed by this volunteer
     */
    readonly following = {}
    nrFollowing = 0
    /**
     * * dictionary<id, user_type> composed by users following this volunteer
     */
    readonly followers = {}
    nrFollowers = 0

    constructor({name, description, linkedinLink}) {
        this.name = name;
        this.description = description;
        this.linkedinLink = linkedinLink;
    }

    setId(id: Id) {
        this._id = id.id
    }
}

export default Volunteer