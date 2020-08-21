import React from "react";
import VolunteersFragment from "./VolunteersFragment";

class VolunteersPage extends React.Component{

    render() {
        return (
            <VolunteersFragment service={this.props.service}/>
        );
    }

}

export default VolunteersPage