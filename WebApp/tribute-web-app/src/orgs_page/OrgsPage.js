import React from "react";
import EventsPage from "../events_page/EventsPage";
import OrgsFragment from "./OrgsFragment";

class OrgsPage extends React.Component{

    render() {
        return(
            <OrgsFragment service={this.props.service}/>
        )
    }

}

export default OrgsPage