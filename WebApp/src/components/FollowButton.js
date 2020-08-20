import React from "react";

function FollowButton({isFollowing, onClick}) {

    return isFollowing ?
        <button
            type="button"
            className="btn btn-danger mr-3"
            onClick={onClick}
        >Unfollow</button> :
        <button
            type="button"
            className="btn btn-primary mr-3"
            onClick={onClick}
        >Follow</button>

}

export default FollowButton