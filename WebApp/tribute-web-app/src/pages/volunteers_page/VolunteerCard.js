import React from "react";
import Image from "../../components/Image";

function VolunteerCard({id, name, nrFollowers, nrFollowing}) {

    return (
        <div className="card m-3 text-center" style={{width: "15rem"}}>
            <div className="card-body d-flex justify-content-center">
                <Image type={'volunteers'} id={id} fb="volunteer.svg"/>
            </div>
            <a className="card-footer" href={`/volunteers/${id}`}>{name}</a>
            <div className="card-footer">
                <p className="card-text">Followers {nrFollowers} | Following {nrFollowing}</p>
            </div>
        </div>
    )
}

function renderVolunteer({_id, name, nrFollowers, nrFollowing}) {
    return <VolunteerCard
        key={_id}
        id={_id}
        name={name}
        nrFollowers={nrFollowers}
        nrFollowing={nrFollowing}
    />
}

export default renderVolunteer