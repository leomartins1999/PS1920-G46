import React, {useEffect, useState} from "react";
import ClickableIcon from "../../components/ClickableIcon";
import {GlobeIcon, MailIcon, PersonIcon} from "@primer/octicons-react";
import {API_BASE_PATH} from "../../api/RequestExecutor";
import Loading from "../../components/Loading";

function VolunteerDisplay({service, id,  volunteer_id}) {

    const [volunteer, setVolunteer] = useState({})

    useEffect(getVolunteer, [])

    function getVolunteer() {
        service.getVolunteer(volunteer_id)
            .then( res => {
                console.log(res);
                setVolunteer(res);
            })
    }

    function followVolunteer() {
        console.log(`org id: ${id}`)
        service.followVolunteer(volunteer_id)
            .then(() => {
                setVolunteer({})
                getVolunteer()
            })
    }

    if (!volunteer.name) return <Loading/>

    return (
        <div className="card m-3">
            <div className="card-header h2">{volunteer.name}</div>
            <img
                className="card-img m-3 align-self-center text-center"
                src={`${API_BASE_PATH}${volunteer.imageLink}`}
                alt=""
                style={{"width": "12rem"}}
            />
            <div className="card-body text-center">
                <p className="text-justify m-3">{volunteer.description}</p>
                <div className="d-inline-flex mb-3">
                    {Object.keys(volunteer.followers).length} Followers
                    <PersonIcon size={24}/>
                    {Object.keys(volunteer.following).length} Following
                </div>
                <div/>
                {volunteer.followers[id] ?
                    <button type="button" className="btn btn-danger" onClick={() => followVolunteer()}>Unfollow</button>:
                    <button type="button" className="btn btn-primary" onClick={() => followVolunteer()}>Follow</button>
                }
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-12 text-center">
                        {volunteer.linkedInLink ?
                            <ClickableIcon link={volunteer.linkedInLink} component={"LinkedIn"}/> :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VolunteerDisplay