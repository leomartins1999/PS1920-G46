import React from "react";
import OrganizationDisplay from "./OrganizationDisplay";

function HomePage({service, id}){
    return(
        <div>
            <OrganizationDisplay service={service} id={id}/>
        </div>
    )
}

export default HomePage