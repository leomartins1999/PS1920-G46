import BaseService from "./BaseService";
import {DEFAULT_LIMIT, DEFAULT_SKIP} from "../db/MongoQuery";
import Event from "../dtos/Event";
import {Error, Status, UserType} from "../Structures";

/**
 * service functions related to events
 */
class EventsService extends BaseService {

    /**
     * retrieves events
     */
    getEvents(limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP, owner_id: string) {
        return BaseService.eventRepository.getEvents(limit, skip, owner_id)
    }

    /**
     * retrieves specific event
     */
    getEventById(id: string) {
        return BaseService.eventRepository.getEventById(id)
    }

    /**
     * creates an event
     */
    addEvent(owner_id: string, name: string, description: string, date: string, time: string, location: string) {
        return BaseService.eventRepository.insertEvent(new Event(owner_id, name, description, date, time, location))
    }

    /**
     * updates an event
     */
    async updateEvent(user_id: string, event_id: string, updates) {
        const event = await BaseService.eventRepository.getEventById(event_id)
        if (event.owner_id != user_id) return Promise.reject(new Error(`Unauthorized operation.`))

        if (updates.date && updates.time) {
            updates.date = new Date(`${updates.date}T${updates.time}:00`).getTime()
        } else {
            delete updates.date
        }
        delete updates.time

        const updateResult = await BaseService.eventRepository.updateEvent(event_id, updates)

        return updateResult.success ?
            new Status('Profile updated', true) :
            Promise.reject(new Error(`Update operation failed.`))
    }

    /**
     * adds an interested volunteer to an event
     */
    async interestedInEvent(user_id: string, event_id: string) {
        const event = await BaseService.eventRepository.getEventById(event_id)

        if (event.interested[user_id]) delete event.interested[user_id]
        else event.interested[user_id] = UserType.Volunteer
        event.nrInterested = Object.keys(event.interested).length

        const updateResult = await BaseService.eventRepository.updateEvent(event_id, event)

        return updateResult.success ?
            new Status('Interested was changed.', true) :
            new Error('Interested operation has failed.')
    }

    async getEventsForUser(id: string, user_type: string, limit = DEFAULT_LIMIT, skip = DEFAULT_SKIP) {
        const ids = await this.getIdsOfFollowing(id, user_type)

        return BaseService.eventRepository.getEventsForOwners(ids, limit, skip)
    }
}

export default EventsService