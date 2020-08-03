import React from "react";
import renderPostCard from "./PostCard";
import Loading from "../../components/Loading";
import {notify} from "../../components/Notifications";

class PostsFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterPosts: false,
            posts: []
        }
    }

    fetchPosts = () => {
        return this.props.service
            .getPosts(this.state.filterPosts? this.props.owner_id : null)
            .then(posts => this.setState({posts: posts}))
            .catch(err => notify(err, false))
    }

    likePost = (post_id) => {
        return this.props.service
            .likePost(post_id)
            .then(this.fetchPosts)
            .catch(err => notify(err, false))
    }

    componentDidMount() {
        this.fetchPosts()
            .then(() => {this.timerID = setInterval(this.fetchPosts, 2000)})
    }

    componentWillUnmount(){
        if (this.timerID) clearInterval(this.timerID)
    }

    filterPosts = (e) => {
        this.setState({filterPosts: e.target.checked, posts: []})
    }

    render() {
        let posts = this.state.posts

        posts = (posts.length === 0)? <Loading/> :
            posts.map(p => renderPostCard(p, this.props.volunteers_service, this.props.orgs_service, this.props.owner_id, this.likePost))

        return (
            <div className="card m-3">
                <div className="card-header text-center">
                    Check your posts
                    <input type="checkbox" className="ml-3" onChange={this.filterPosts}/>
                </div>
                <div className="card-body">
                    {posts}
                </div>
            </div>
        )
    }

}

export default PostsFragment