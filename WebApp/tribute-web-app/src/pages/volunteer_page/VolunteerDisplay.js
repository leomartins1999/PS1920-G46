import React, {useEffect, useState} from "react";
import ClickableIcon from "../../components/ClickableIcon";
import {GlobeIcon, MailIcon} from "@primer/octicons-react";
import {API_BASE_PATH} from "../../api/RequestExecutor";

function VolunteerDisplay({service, volunteer_id}) {

    const [volunteer, setVolunteer] = useState({})

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [linkedinLink, setLinkedinLink] = useState("")
    const [following, setFollowing] = useState({})
    const [followers, setFollowers] = useState({})

    useEffect(getVolunteer, [])

    function getVolunteer() {
        service.getVolunteer(volunteer_id)
            .then( res => {
                console.log(res);
                setVolunteer(res);
                setName(res.name);
                setDescription(res.description);
                setImageLink(res.imageLink);
                setLinkedinLink(res.linkedInLink);
                setFollowing(res.following);
                setFollowers(res.followers);
            })
    }



    return (
        <div className="card m-3">
            <div className="card-header h2">{name}</div>
            <img
                className="card-img m-3 align-self-center text-center"
                src={`${API_BASE_PATH}${imageLink}?${performance.now()}`}
                alt=""
                style={{"width": "12rem"}}
            />
            <div className="card-body">

            </div>
            <div className="card-footer">
                <div className="card-footer d-inline-flex justify-content-center">
                    <div className="row container-fluid">
                        <div className="col-4 text-center">
                            {linkedinLink ?
                                <ClickableIcon link={linkedinLink} component={"LinkedIn"}/> :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VolunteerDisplay