import {Id} from "../Structures";

class Org {

    _id: string
    readonly name: string
    readonly description: string
    readonly phone: string
    readonly siteLink: string
    readonly facebookLink: string
    readonly linkedinLink: string
    /**
     * dictionary<id, user_type> containing users followed by this org
     */
    readonly following = {}
    nrFollowing = 0
    /**
     * dictionary<id, user_type> containing users following this org
     */
    readonly followers = {}
    nrFollowers = 0

    constructor({name, description, phone, siteLink, facebookLink, linkedinLink}) {
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.siteLink = siteLink;
        this.facebookLink = facebookLink;
        this.linkedinLink = linkedinLink;
    }

    setId(id: Id) {
        this._id = id.id
    }
}

export default Org