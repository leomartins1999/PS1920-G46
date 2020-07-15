import React from "react";
import {API_BASE_PATH} from "../../api/RequestExecutor";

function EventCard({id, org_id, name, date, location, imageLink}) {
    return (
        <div className="card mb-4">
            <div className="card-header h2">{org_id}</div>
            <div className="card-body text-center">
                <a href={`/events/${id}`} className="h3 text-center">{name}</a>
                <div/>
                <img
                    className="card-img m-3 align-self-center text-center"
                    src={`${API_BASE_PATH}${imageLink}`}
                    alt={""}
                    style={{"width": "12rem"}}
                />
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-6 text-left">
                        {date}
                    </div>
                    <div className="col-6 text-right">
                        {location}
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderEventCard(event) {
    return (
        <EventCard
            key={event._id}
            id={event._id}
            org_id={event.org_id}
            name={event.name}
            date={event.date}
            location={event.location}
            imageLink={event.imageLink}
        />
    )
}

export default renderEventCard