const SESSION_KEY = "SESSION_ID"

function getAuthService(executor){
    return{
        login: login,
        register: register,
        logout: logout,
        getSession: getSession,
    }

    function login(email, password){
        const body = {
            email: email,
            password: password
        }

        return executor
            .post("/login", body)
            .then(body => {
                if(body.user_details.user_type !== "org") return Promise.reject("Invalid user type")

                sessionStorage.setItem(SESSION_KEY, body.user_details.user_id)
                return Promise.resolve(true)
            })
            .catch(err => console.log(err))
    }

    function register(email, password, name) {
        const body = {
            "email": email,
            "password": password,
            "user_type": "org",
            "data": {
                "name": name,
            }
        }

        return executor.post("/register", body)
            .catch(err => console.log(err))
    }

    function logout(){
        return executor
            .get("/logout")
            .then(resp => {
                if (resp) sessionStorage.removeItem(SESSION_KEY)
            })
            .catch(err => console.log(err))
    }

    function getSession(){
        return sessionStorage.getItem(SESSION_KEY)
    }
}

export default getAuthService