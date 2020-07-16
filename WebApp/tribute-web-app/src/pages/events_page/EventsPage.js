import React from "react";

import EventsFragment from "./EventsFragment";
import EventForm from "./EventForm";

function EventsPage({service, orgs_service, id}) {
    return(
        <div>
            <EventForm service={service}/>
            <EventsFragment
                service={service}
                orgs_service={orgs_service}
                id={id}
            />
        </div>
    )
}

export default EventsPage