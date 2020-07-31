import React, {useState} from "react";
import {notify} from "../../components/Notifications";

function LoginPage({service, onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        service.login(email, password).then((res) => {
            if (res) {
                notify("Login successful!", true)
                onLogin()
            } else {
                console.log(res)
                notify("Fuck.", false)

                setEmail("")
                setPassword("")
            }
        })
    }

    function submit() {
        if (!validate()) {
            console.log("Invalid username or password")
            return;
        }

        login();
    }

    function validate() {
        return email && email.trim() !== "" && password
    }

    return (
        <div className="text-center card container p-5">
            <h1 className="text-primary text-left">Tribute</h1>
            <h5 className="text-secondary text-left">For orgs</h5>
            <div className="h3 mb-3 font-weight-normal">Login</div>
            <input className="form-control mb-1" placeholder="Email" required
                   autoFocus
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password" className="form-control mb-3" placeholder="Password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="mb-3 btn btn-lg btn-primary btn-block" onClick={submit}>Sign in</button>
            <a className="text-center btn-link" href="/register">New to this platform? Sign up here</a>
            <a className="mt-3 text-center btn-link" href="/tribute-app">Are you a volunteer?</a>
        </div>
    )
}

export default LoginPage