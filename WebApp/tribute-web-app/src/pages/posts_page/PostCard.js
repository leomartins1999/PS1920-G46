import React from "react";
import moment from "moment";
import {ThumbsupIcon} from "@primer/octicons-react";
import {renderElementHeader} from "../../components/EntryHeader";
import Image from "../../components/Image";

function PostCard({post_id, owner_id, owner_type, body, imageLink, likes, time, volunteerService, orgsService, likesPost, onLike}) {
    return (
        <div className="card mb-4">
            <div className="card-header">
                {renderElementHeader(owner_id, owner_type, volunteerService, orgsService)}
            </div>
            <div className="card-body text-center">
                <p className="text-justify m-3">{body}</p>
                <Image type='posts' id={post_id} link={imageLink}/>
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-6 text-left">
                        {time ? moment(time).fromNow() : ''}
                    </div>
                    <div className="col-6 text-right">
                        {likes}
                        <button
                            className={`btn btn-link ${likesPost ? "text-primary" : "text-dark"}`}
                            onClick={() => onLike(post_id)}>
                            <ThumbsupIcon size={24}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function renderPostCard(post, volunteersService, orgsService, session_id, likeFunc) {
    return (
        <PostCard
            key={post._id}
            post_id={post._id}
            owner_id={post.owner_id}
            owner_type={post.owner_type}
            body={post.body}
            imageLink={post.imageLink}
            likes={post.nrLikes}
            time={post.time}
            volunteerService={volunteersService}
            orgsService={orgsService}
            likesPost={Object.keys(post.likes).some(k => k === session_id)}
            onLike={likeFunc}
        />
    )
}

export default renderPostCard