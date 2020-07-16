import React from "react";

import PostsFragment from "./PostsFragment";
import PostForm from "./PostForm";

function PostsPage({posts_service, volunteers_service, orgs_service, id}) {

    return (
        <div>
            <PostForm service={posts_service}/>
            <PostsFragment
                service={posts_service}
                volunteers_service={volunteers_service}
                orgs_service={orgs_service}
                owner_id={id}
            />
        </div>
    )

}

export default PostsPage