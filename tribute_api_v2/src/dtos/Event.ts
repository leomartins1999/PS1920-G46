/**
 * representation of event
 */
class Event {

    _id: string
    /**
     * id of event owner
     */
    readonly owner_id: string
    readonly name: string
    readonly description: string
    readonly date: Date
    readonly location: string
    /**
     * dictionary<id, user_type> of users interested in events
     */
    readonly interested = {}
    nrInterested = 0

    constructor(owner_id: string, name: string, description: string, date: string, location: string) {
        this.owner_id = owner_id;
        this.name = name;
        this.description = description;
        this.location = location;
        this.date = new Date(date)
    }
}

export default Event