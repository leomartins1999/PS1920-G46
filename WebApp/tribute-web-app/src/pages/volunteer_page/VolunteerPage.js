import React from "react";
import VolunteerDisplay from "./VolunteerDisplay";

function VolunteerPage({service, volunteer_id}) {

    return (
        <div>
            <VolunteerDisplay service={service} volunteer_id={volunteer_id}/>
        </div>
    )

}

export default VolunteerPage