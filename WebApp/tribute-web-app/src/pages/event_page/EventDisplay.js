import React, {useEffect, useState} from "react";
import Loading from "../../components/Loading";
import {API_BASE_PATH} from "../../api/RequestExecutor";
import {CalendarIcon, LocationIcon, PersonIcon} from "@primer/octicons-react";
import renderInterestedTuple from "./InterestedTuple";

function EventDisplay({service, event_id, session_id}) {

    const [event, setEvent] = useState({})
    const [editing, setEditing] = useState(false);

    function getEvent() {
        service.getEvent(event_id)
            .then(res => {
                if (res) setEvent(res)
            })
    }

    useEffect(getEvent, [])

    if (!event.name) return <Loading/>

    return event.org_id === session_id ? ownerRender() : notOwnerRender();

    function renderEditing() {
        return notOwnerRender()
    }

    function ownerRender() {
        const interested = Object
            .keys(event.interested)
            .map(renderInterestedTuple)

        return (
            <div>
                {editing ? renderEditing() : notOwnerRender()}
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
                    <img
                        className="card-img m-3 align-self-center text-center"
                        src={`${API_BASE_PATH}${event.imageLink}`}
                        alt=""
                        style={{"width": "12rem"}}
                    />
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