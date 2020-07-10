import React from "react";
import OrganizationCard from "./OrganizationCard";

function HomePage({service}){
    return(
        <div>
            <OrganizationCard service={service}/>
        </div>
    )
}

export default HomePage