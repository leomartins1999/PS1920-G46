import React, {useState} from "react";
import {useHistory} from "react-router-dom"

function LoginPage({service}) {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="text-center container-fluid p-5">
            <h1 className="h3 mb-3 font-weight-normal">Login as Organization</h1>
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
            <button className="btn btn-lg btn-primary btn-block" onClick={submit}>Sign in</button>
        </div>
    )

    function login() {
        service.login(email, password).then((res) => {
            if (res) history.push("/home")
            else{
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
}

export default LoginPage