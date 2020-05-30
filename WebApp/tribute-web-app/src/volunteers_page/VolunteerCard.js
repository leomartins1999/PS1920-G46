import React from "react";

function VolunteerCard({name, imageLink, nrFollowers, nrFollowing}) {
    console.log(`http://tribute-api.duckdns.org/api${imageLink}`)

    return (
        <div className="card m-3 text-center" style={{margin: "m-3"}}>
            <img
                className="card-img-top m-3 rounded-circle"
                src={`http://tribute-api.duckdns.org/api${imageLink}`}
                alt="Card image cap"
                style={{maxWidth: "200px", maxHeight: "200px", width: "auto", height: "auto", alignSelf: "center"}}
            />
            <div className="card-body">
                <p className="card-title">{name}</p>
                <p className="card-text">Followers {nrFollowers} | Following {nrFollowing}</p>
            </div>
        </div>
    )
}

function renderEntity({_id, name, imageLink, followers, following}) {
    console.log(followers)

    return <VolunteerCard
        key={_id}
        name={name}
        imageLink={imageLink}
        nrFollowers={Object.keys(followers).length}
        nrFollowing={Object.keys(following).length}
    />
}

export default renderEntity