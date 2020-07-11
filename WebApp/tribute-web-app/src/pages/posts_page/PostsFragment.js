import React from "react";
import renderPostCard from "./PostCard";

class PostsFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    fetchPosts() {
        return this.props.service.getPosts(this.props.owner_id)
            .then(posts => {
                if (posts) this.setState({posts: posts})
            })
    }

    componentDidMount() {
        this.fetchPosts()
            .then(() => {
                this.timerID = setInterval(() => this.fetchPosts(), 2000)
            })
    }

    componentWillUnmount() {
        if (this.timerID)
            clearInterval(this.timerID)
    }

    render() {
        let posts = this.state.posts

        posts = posts.map(renderPostCard)

        return (
            <div className="jumbotron border-primary m-5">
                <div className="text-center h1">Posts</div>
                {posts}
            </div>
        )
    }

}

export default PostsFragment