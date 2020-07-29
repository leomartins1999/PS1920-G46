import React from "react";
import EventDisplay from "./EventDisplay";

function EventPage({service, volunteerService, session_id, event_id}) {
    return (
        <div>
            <EventDisplay
                service={service}
                volunteerService={volunteerService}
                session_id={session_id}
                event_id={event_id}
            />
        </div>
    )
}

export default EventPage