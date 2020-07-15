import React from "react";
import EventDisplay from "./EventDisplay";

function EventPage({service, session_id, event_id}) {
    return (
        <div>
            <EventDisplay
                service={service}
                session_id={session_id}
                event_id={event_id}
            />
        </div>
    )
}

export default EventPage