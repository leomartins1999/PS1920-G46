import React, {useEffect, useState} from "react";
import ClickableComponent from "../../utils/ClickableIcon";
import {PersonIcon} from "@primer/octicons-react";
import Loading from "../../utils/Loading";
import FollowButton from "../../utils/FollowButton";
import Image from "../../utils/Image";
import {notify} from "../../utils/Notifications";

function VolunteerDisplay({service, id, volunteer_id}) {

    const [volunteer, setVolunteer] = useState({})

    useEffect(getVolunteer, [])

    function getVolunteer() {
        service.getVolunteer(volunteer_id)
            .then(setVolunteer)
            .catch(err => notify(err, false))
    }

    function followVolunteer() {
        service.followVolunteer(volunteer_id)
            .then(getVolunteer)
            .catch(err => notify(err, false))
    }

    function follow() {
        setVolunteer({})
        followVolunteer()
    }

    if (!volunteer.name) return <Loading/>

    return (
        <div>
            <div className="card border-primary m-3">
                <div className="card-header h2">{volunteer.name}</div>
                <Image type={'volunteers'} id={volunteer._id} fb="images/volunteer.svg"/>
                <div className="card-body text-center">
                    <p className="text-justify m-3">{volunteer.description}</p>
                    <div className="d-inline-flex mb-3">
                        {volunteer.nrFollowers} Followers
                        <PersonIcon size={24}/>
                        {volunteer.nrFollowing} Following
                    </div>
                </div>
                <div className="card-footer d-inline-flex justify-content-center">
                    <div className="row container-fluid">
                        <div className="col-12 text-center">
                            <ClickableComponent link={volunteer.linkedInLink} component={"LinkedIn"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <FollowButton isFollowing={volunteer.followers[id]} onClick={follow}/>
            </div>
        </div>
    )
}

export default VolunteerDisplay