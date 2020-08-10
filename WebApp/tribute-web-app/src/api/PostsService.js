function getPostsService(executor){

    return{
        createPost: createPost,
        getPosts: getPosts,
        updatePostImage: updatePostImage,
        likePost: likePost
    }

    function createPost(text) {
        const body = {
            body: text
        }

        return executor.post("/auth/posts", body)
    }

    function getPosts(owner_id) {
        let url = "/posts"
        if (owner_id) url = url.concat(`?owner_id=${owner_id}`)

        return executor.get(url)
    }

    function likePost(post_id){
        return executor.put(`/auth/posts/${post_id}/like`)
    }

    function updatePostImage(id, image){
        return executor.uploadImage(`/auth/images/posts/${id}`, image)
    }

}

export default getPostsService