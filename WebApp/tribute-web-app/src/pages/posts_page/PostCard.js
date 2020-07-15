import React from "react";
import {API_BASE_PATH} from "../../api/RequestExecutor";
import moment from "moment";
import {ThumbsupIcon} from "@primer/octicons-react";

function PostCard({owner_id, description, imageLink, likes, time}){
    return(
        <div className="card mb-4">
            <div className="card-header h2">{owner_id}</div>
            <div className="card-body text-center">
                <p className="text-justify m-3">{description}</p>
                <img
                    className="card-img m-3 align-self-center text-center"
                    src={`${API_BASE_PATH}${imageLink}`}
                    alt={""}
                    style={{"width": "12rem"}}
                />
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-6 text-left">
                        {moment(time).fromNow()}
                    </div>
                    <div className="col-6 text-right">
                        {likes}
                        <ThumbsupIcon size={24} className="ml-2"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderPostCard(post){
    return(
        <PostCard
            key={post._id}
            owner_id={post.owner_id}
            description={post.description}
            imageLink={post.imageLink}
            likes={Object.keys(post.likes).length}
            time={post.time}
        />
    )
}

export default renderPostCard