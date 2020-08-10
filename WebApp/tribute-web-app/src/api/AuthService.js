const SESSION_KEY = "SESSION_ID"

function getAuthService(executor) {
    return {
        login: login,
        register: register,
        logout: logout,
        getSession: getSession,
    }

    function login(email, password) {
        const body = {
            email: email,
            password: password
        }

        return executor
            .post("/login", body)
            .then(body => {
                if (body.user_details.user_type !== "org")
                    return Promise.reject("Invalid user type. Use the mobile app to authenticate as a volunteer.")

                sessionStorage.setItem(SESSION_KEY, body.user_details.id)
                return Promise.resolve()
            })
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
    }

    function logout() {
        return executor
            .get("/auth/logout")
            .then(() => sessionStorage.removeItem(SESSION_KEY))
    }

    function getSession() {
        return sessionStorage.getItem(SESSION_KEY)
    }
}

export default getAuthService