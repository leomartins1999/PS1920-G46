import React from "react";

import PostsFragment from "./PostsFragment";

class PostsPage extends React.Component{

    render() {
        return(
            <PostsFragment service={this.props.service}/>
        )
    }

}

export default PostsPage