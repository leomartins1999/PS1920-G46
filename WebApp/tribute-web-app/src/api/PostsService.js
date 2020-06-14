function getPostsService(executor){

    return{
        getPosts: getPosts,
        createPost: createPost
    }

    function getPosts(owner_id) {
        let url = "/posts"
        if (owner_id) url = url.concat(`?owner_id=${owner_id}`)

        return executor.get(url)
    }

    function createPost(text) {
        const body = {
            description: text
        }

        return executor.post("/auth/posts", body)
    }

}

export default getPostsService