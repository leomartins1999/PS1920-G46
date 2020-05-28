import React from "react";

function PostCard({description, imageLink}){
    return(
        <div className="card text-center m-5">
            <div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                </div>
                <img
                    className="m-3"
                    src={imageLink}
                    alt="Card image cap"
                    style={{maxWidth: "18rem", alignSelf: "center"}}
                />
            </div>
        </div>
    )
}

function renderPostCard(post){
    return(
        <PostCard
            description={post.description}
            imageLink={post.imageLink}
        />
    )
}

export default renderPostCard