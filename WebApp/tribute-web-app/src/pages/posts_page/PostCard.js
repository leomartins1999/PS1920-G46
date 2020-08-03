import React from "react";
import moment from "moment";
import {ThumbsupIcon} from "@primer/octicons-react";
import {renderElementHeader} from "../../components/EntryHeader";
import Image from "../../components/Image";

function PostCard({post_id, owner_id, owner_type, description, imageLink, likes, time, volunteerService, orgsService, likesPost, onLike}){
    return(
        <div className="card mb-4">
            <div className="card-header">{renderElementHeader(owner_id, owner_type, volunteerService, orgsService)}</div>
            <div className="card-body text-center">
                <p className="text-justify m-3">{description}</p>
                <Image link={imageLink} cache={true}/>
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-6 text-left">
                        {moment(time).fromNow()}
                    </div>
                    <div className="col-6 text-right">
                        {likes}
                        <button
                            className={`btn btn-link ${likesPost? "text-primary" : "text-dark"}`}
                            onClick={() => onLike(post_id)}>
                            <ThumbsupIcon size={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderPostCard(post, volunteersService, orgsService, session_id, likeFunc){
    return(
        <PostCard
            key={post._id}
            post_id={post._id}
            owner_id={post.owner_id}
            owner_type={post.owner_type}
            description={post.description}
            imageLink={post.imageLink}
            likes={Object.keys(post.likes).length}
            time={post.time}
            volunteerService={volunteersService}
            orgsService={orgsService}
            likesPost={Object.keys(post.likes).some(k=> k === session_id)}
            onLike={likeFunc}
        />
    )
}

export default renderPostCard