import React from "react";

import EventsFragment from "./EventsFragment";
import EventForm from "./EventForm";

function EventsPage({service, id}) {
    return(
        <div>
            <EventForm service={service}/>
            <EventsFragment service={service} id={id}/>
        </div>
    )
}

export default EventsPage