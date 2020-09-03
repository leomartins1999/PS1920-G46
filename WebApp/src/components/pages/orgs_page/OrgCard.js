import React from "react";
import Image from "../../utils/Image";

function OrgCard({id, name, nrFollowers, nrFollowing}) {

    return (
        <div className="card m-3 text-center" style={{width: "15rem"}}>
            <div className="card-body d-flex justify-content-center">
                <Image type={'orgs'} id={id} fb="images/org.svg"/>
            </div>
            <a className="card-footer" href={`/orgs/${id}`}>{name}</a>
            <div className="card-footer">
                <p className="card-text">Followers {nrFollowers} | Following {nrFollowing}</p>
            </div>
        </div>
    )
}

function renderOrg({_id, name, nrFollowers, nrFollowing}) {
    return <OrgCard
        key={_id}
        id={_id}
        name={name}
        nrFollowers={nrFollowers}
        nrFollowing={nrFollowing}
    />
}

export default renderOrg