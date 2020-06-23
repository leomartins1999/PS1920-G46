import React from "react";
import PostsFragment from "../posts_page/PostsFragment";
import PostForm from "./PostForm";

class HomePage extends React.Component {

    constructor(props) {
        super(props)
    }

    renderAuthenticatedPage() {
        return (
            <div>
                <h1>Authenticated home Page</h1>
                <PostsFragment
                    service={this.props.posts_service}
                    owner_id={this.props.user_id}
                />
                <PostForm
                    service={this.props.posts_service}
                />
            </div>
        )
    }

    renderNonAuthenticatedPage() {
        return (
            <h1>Not authenticated home Page</h1>
        )
    }

    render() {
        return this.props.user_id ?
            this.renderAuthenticatedPage() : this.renderNonAuthenticatedPage()
    }

}

export default HomePage