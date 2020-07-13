import React from "react";

function EventCard({org_id, name, date, location, description, imageLink, interested, participants}){

    return(
        <div className="card mb-4">
            <div className="card-header h2">{org_id}</div>
            <div className="card-body text-center">
                {name}
            </div>
        </div>
    )
}

/*
<div className="card text-center m-5">
            <div>
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-4">
                            {name}
                        </div>
                        <div className="col-md-4"/>
                        <div className="col-md-2">
                            {location}
                        </div>
                        <div className="col-md-2">
                            {date}
                        </div>
                    </div>
                </div>
                <img
                    className="m-3"
                    src={imageLink}
                    alt=""
                    style={{maxWidth: "18rem", alignSelf: "center"}}
                />
                <div className="card-body">
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-around">
                        <div className="col-4">
                            {Object.keys(participants).length} participant(s)
                        </div>
                        <div className="col-4">
                            {Object.keys(interested).length} interested
                        </div>
                    </div>
                </div>
            </div>
        </div>
 */

function renderEventCard(event){
    console.log(event);
    return(
        <EventCard
            org_id={event.org_id}
            name={event.name}
            date={event.date}
            location={event.location}
            description={event.description}
            imageLink={event.imageLink}
            interested={event.interested}
            participants={event.participants}
        />
    )
}

export default renderEventCard