import React from "react";
import OrgsFragment from "./OrgsFragment";

class OrgsPage extends React.Component{

    render() {
        return(
            <OrgsFragment service={this.props.service}/>
        )
    }

}

export default OrgsPage