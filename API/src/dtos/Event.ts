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
    readonly date: number
    readonly location: string
    /**
     * dictionary<id, user_type> of users interested in events
     */
    readonly interested = {}
    nrInterested = 0

    constructor(owner_id: string, name: string, description: string, date: string, time: string, location: string) {
        this.owner_id = owner_id;
        this.name = name;
        this.description = description;
        this.location = location;

        this.date = (date && time) ? new Date(`${date}T${time}:00`).getTime() : null
    }
}

export default Event