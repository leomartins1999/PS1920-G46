import React from "react";
import {MailIcon, PersonIcon} from "@primer/octicons-react";


function InterestedTuple({id, name, mail}) {
    return (
        <div className="row justify-content-center mb-3">
            <a className="h5" href={`/volunteers/${id}`}>{name}</a>
            <PersonIcon className="ml-2 mr-2" size={24}/>
            <MailIcon className="ml-2 mr-2" size={24}/>
            <a className="h5" href={`mailto:${mail}`}>mail</a>
        </div>
    )
}

function renderInterestedTuple(id) {
    return <InterestedTuple key={id} id={id} name="todo" mail="todo"/>
}

export default renderInterestedTuple