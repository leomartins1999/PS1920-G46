import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {CalendarIcon, LocationIcon, PersonIcon} from "@primer/octicons-react";
import renderInterested from "./Interested";
import Image from "../../components/Image";

function EventDisplay({service, volunteerService, event_id, session_id}) {

    const [event, setEvent] = useState({})
    const [editing, setEditing] = useState(false);

    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);

    const [image, setImage] = useState(null);

    function getEvent() {
        service.getEvent(event_id)
            .then(res => {
                if (res) {
                    setEvent(res)

                    setDescription(res.description)
                    setLocation(res.location)
                    setDate(res.date)
                }
            })
    }

    function updateEvent() {
        service.updateEvent(event_id, {org_id: session_id, description: description, date: date, location: location})
            .then(getEvent)

        if (image) service.updateEventImage(event_id, image).then(getEvent)
    }

    function update() {
        setEditing(false)
        setEvent({})

        updateEvent()
    }

    useEffect(getEvent, [])

    if (!event.name) return <Loading/>

    return event.org_id === session_id ? ownerRender() : notOwnerRender();

    function renderEditing() {
        return (
            <div>
                <div className="card m-3">
                    <div className="card-header h2">{event.name}</div>
                    <div className="card-body text-center">
                        <p>New image</p>
                        <input
                            type="file"
                            className="form-control-file mr-2 text-center mb-3"
                            onChange={(e) => setImage(e.target.files[0])}
                            placeholder="Select image"
                        />
                        <textarea
                            className="form-control mb-3"
                            value={description}
                            placeholder="Description..."
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="d-inline-flex mb-3 align-items-center">
                            <LocationIcon size={24}/>
                            <input
                                className="form-control ml-2"
                                value={location}
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <input
                                type="date"
                                className="form-control ml-2"
                                value={date}
                                placeholder="Location"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div/>
                        <div className="d-inline-flex">
                            {Object.keys(event.interested).length} Interested
                            <PersonIcon size={24}/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary mr-3" onClick={update}>Submit changes</button>
                    <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>Cancel</button>
                </div>
            </div>
        )
    }

    function ownerRender() {
        const interested = Object
            .keys(event.interested)
            .map((id) => renderInterested(id, volunteerService))

        return editing ?
            renderEditing() :
            (
                <div>
                    {notOwnerRender()}
                    <div className="d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary mr-3"
                            onClick={() => setEditing(true)}
                        >Edit</button>
                    </div>
                    <div className="card m-3">
                        <div className="card-header h2">Interested Volunteers</div>
                        <div className="card-body">
                            {interested}
                        </div>
                    </div>
                </div>
            )
    }

    function notOwnerRender() {
        return (
            <div className="card m-3">
                <div className="card-header h2">{event.name}</div>
                <div className="card-body text-center">
                    <p className="text-justify m-3">{event.description}</p>
                    <Image link={event.imageLink} cache={true}/>
                    <div/>
                    <div className="d-inline-flex justify-content-center">
                        <LocationIcon size={24}/>
                        <p className="ml-2">{event.location}</p>
                    </div>
                    <div/>
                    <div className="d-inline-flex justify-content-center">
                        <CalendarIcon size={24}/>
                        <p className="ml-2">{event.date}</p>
                    </div>
                </div>
                <div className="card-footer d-inline-flex justify-content-center">
                    {Object.keys(event.interested).length} Interested
                    <PersonIcon className="ml-2" size={24}/>
                </div>
            </div>
        )
    }
}

export default EventDisplay