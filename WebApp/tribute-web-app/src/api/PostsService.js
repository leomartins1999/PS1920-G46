function getPostsService(executor){

    return{
        getPosts: getPosts
    }

    function getPosts() {
        return executor.get('/posts')
    }

}

export default getPostsService