import React from "react";
import OrganizationCard from "./OrganizationCard";

function HomePage({service, id}){
    return(
        <div>
            <OrganizationCard service={service} id={id}/>
        </div>
    )
}

export default HomePage