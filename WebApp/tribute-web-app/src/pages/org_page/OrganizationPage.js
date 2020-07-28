import React from "react";
import OrganizationDisplay from "./OrganizationDisplay";

function OrganizationPage({service, org_id, id}){
    return(
        <div>
            <OrganizationDisplay service={service} org_id={org_id} id={id}/>
        </div>
    )
}

export default OrganizationPage