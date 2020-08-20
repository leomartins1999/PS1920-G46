import React from "react";
import {renderOrgHeader} from "../../components/EntryHeader";
import Image from "../../components/Image";

function EventCard({id, org_id, name, date, location, orgsService}) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                {renderOrgHeader(org_id, orgsService)}
            </div>
            <div className="card-body text-center">
                <a href={`/events/${id}`} className="h3 text-center">{name}</a>
                <div/>
                <Image type={'events'} id={id}/>
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-6 text-left">
                        {new Date(date).toLocaleString()}
                    </div>
                    <div className="col-6 text-right">
                        {location}
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderEventCard(event, orgsService) {
    return (
        <EventCard
            key={event._id}
            id={event._id}
            org_id={event.owner_id}
            name={event.name}
            date={event.date}
            location={event.location}
            orgsService={orgsService}
        />
    )
}

export default renderEventCard