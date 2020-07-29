import React, {useEffect, useState} from "react";
import {MailIcon, PersonIcon} from "@primer/octicons-react";
import Loading from "../../components/Loading";

function InterestedInEvent({id, service}) {
    const [volunteer, setVolunteer] = useState({})
    const [mail, setMail] = useState('')

    function getVolunteer(){
        service.getVolunteer(id).then(setVolunteer)
    }

    function getMail(){

    }

    useEffect(getVolunteer, [])
    useEffect(getMail, [])

    return volunteer.name?
        <div className="row justify-content-center mb-3">
            <a className="h5" href={`/volunteers/${id}`}>{volunteer.name}</a>
            <PersonIcon className="ml-2 mr-2" size={24}/>
            <MailIcon className="ml-2 mr-2" size={24}/>
            <a className="h5" href={`mailto:${mail}`}>mail</a>
        </div> : <Loading/>
}

function renderInterested(id, service) {
    return <InterestedInEvent id={id} service={service}/>
}

export default renderInterested