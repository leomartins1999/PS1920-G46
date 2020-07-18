import React from "react";
import Image from "../../components/Image";

function VolunteerCard({id, name, imageLink, nrFollowers, nrFollowing}) {

    return (
        <div className="card m-3 text-center" style={{width: "15rem"}}>
            <Image link={imageLink} cache={true} fb="volunteer.svg"/>
            <a className="card-header" href={`/volunteers/${id}`}>{name}</a>
            <div className="card-footer">
                <p className="card-text">Followers {nrFollowers} | Following {nrFollowing}</p>
            </div>
        </div>
    )
}

function renderEntity({_id, name, imageLink, followers, following}) {
    console.log(followers)

    return <VolunteerCard
        key={_id}
        id={_id}
        name={name}
        imageLink={imageLink}
        nrFollowers={Object.keys(followers).length}
        nrFollowing={Object.keys(following).length}
    />
}

export default renderEntity