import React, {useEffect, useState} from "react";
import Loading from "../../utils/Loading";
import {CalendarIcon, LocationIcon, PersonIcon} from "@primer/octicons-react";
import renderInterested from "./Interested";
import Image from "../../utils/Image";
import {notify} from "../../utils/Notifications";
import ImageForm from "../../utils/ImageForm";

function EventDisplay({service, volunteerService, event_id, session_id}) {

    const [event, setEvent] = useState({})
    const [stamp, setStamp] = useState(Date.now())

    const [editing, setEditing] = useState(false);

    const [description, setDescription] = useState(event.description);
    const [location, setLocation] = useState(event.location);
    const [date, setDate] = useState(event.date);
    const [time, setTime] = useState(event.time)

    const [image, setImage] = useState(null);

    useEffect(() => {getEvent()}, [])

    function getEvent() {
        service.getEvent(event_id)
            .then(res => {
                setEvent(res)

                setDescription(res.description)
                setLocation(res.location)
            })
            .catch(err => notify(err, false))
    }

    function updateEvent() {
        return service
            .updateEvent(event_id, {description, date, time, location})
            .then(_ => image ? service.updateEventImage(event_id, image) : Promise.resolve())
            .then(_ => setStamp(Date.now()))
            .catch(err => notify(err, false))
            .then(getEvent)
    }

    function update() {
        setEditing(false)
        setEvent({})

        updateEvent()
    }

    if (!event.name) return <Loading/>

    return event.owner_id === session_id ? ownerRender() : notOwnerRender();

    function renderEditing() {
        return (
            <div>
                <div className="card border-primary m-3">
                    <div className="card-header h2">{event.name}</div>
                    <div className="card-body text-center">
                        <textarea
                            className="form-control mb-3"
                            value={description}
                            placeholder="Description..."
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <ImageForm image={image} setImage={setImage}/>
                        <div className="d-flex mb-3 align-items-center">
                            <input
                                type="date"
                                className="form-control mr-2 text-center"
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <input
                                type='time'
                                className='form-control text-center'
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className='d-inline-flex align-items-center mb-2'>
                            <LocationIcon size={24}/>
                            <input
                                className="form-control ml-2"
                                value={location}
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div/>
                        <div className="d-inline-flex">
                            {event.nrInterested} Interested
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
                    <div className="card border-primary m-3">
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
            <div className="card border-primary m-3">
                <div className="card-header h2">{event.name}</div>
                <div className="card-body text-center">
                    <p className="text-justify m-3">{event.description}</p>
                    <Image type={'events'} id={event._id} cache={stamp}/>
                    <div/>
                    <div className="d-inline-flex justify-content-center">
                        <LocationIcon size={24}/>
                        <p className="ml-2">{event.location ? event.location : "(no location provided)"}</p>
                    </div>
                    <div/>
                    <div className="d-inline-flex justify-content-center">
                        <CalendarIcon size={24}/>
                        <p className="ml-2">{event.date ? new Date(event.date).toLocaleString() : "(no date provided)"}</p>
                    </div>
                </div>
                <div className="card-footer d-inline-flex justify-content-center">
                    {event.nrInterested} Interested
                    <PersonIcon className="ml-2" size={24}/>
                </div>
            </div>
        )
    }
}

export default EventDisplay