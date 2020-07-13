import React from "react";

import PostsFragment from "./PostsFragment";
import PostForm from "./PostForm";

function PostsPage({service, id}) {

    return (
        <div>
            <PostForm service={service}/>
            <PostsFragment service={service} owner_id={id}/>
        </div>
    )

}

export default PostsPage