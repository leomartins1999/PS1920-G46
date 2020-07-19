import React from "react";
import Image from "../../components/Image";

function OrgCard({id, name, imageLink, nrFollowers, nrFollowing}) {

    return (
        <div className="card m-3 text-center" style={{width: "15rem"}}>
            <div className="card-body d-flex justify-content-center"><Image link={imageLink} cache={true} fb="org.svg"/></div>
            <a className="card-footer" href={`/orgs/${id}`}>{name}</a>
            <div className="card-footer">
                <p className="card-text">Followers {nrFollowers} | Following {nrFollowing}</p>
            </div>
        </div>
    )
}

function renderOrg({_id, name, imageLink, followers, following}) {
    return <OrgCard
        key={_id}
        id={_id}
        name={name}
        imageLink={imageLink}
        nrFollowers={Object.keys(followers).length}
        nrFollowing={Object.keys(following).length}
    />
}

export default renderOrg