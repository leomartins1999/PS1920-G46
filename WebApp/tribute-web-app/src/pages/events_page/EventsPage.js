import React from "react";

import EventsFragment from "./EventsFragment";

class EventsPage extends React.Component{

    render() {
        return(
            <EventsFragment service={this.props.service}/>
        )
    }

}

export default EventsPage