function getAuthService(executor){
    return{
        login: login,
        postTest: postTest
    }

    function login(email, password){
        const body = {
            email: email,
            password: password
        }

        return executor.post("/login", body)
    }

    function postTest() {
        const body = {
            description: "test post"
        }

        return executor.post("/auth/posts", body)
    }
}

export default getAuthService