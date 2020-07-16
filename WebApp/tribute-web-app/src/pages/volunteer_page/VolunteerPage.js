import React from "react";
import VolunteerDisplay from "./VolunteerDisplay";

function VolunteerPage({service, id, volunteer_id}) {

    return (
        <div>
            <VolunteerDisplay service={service} id ={id} volunteer_id={volunteer_id}/>
        </div>
    )

}

export default VolunteerPage