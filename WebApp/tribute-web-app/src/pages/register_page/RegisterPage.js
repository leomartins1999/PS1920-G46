import React, {useState} from "react";
import {notify} from "../../components/Notifications";

function RegisterPage({service, onLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("")

    function register() {
        return service
            .register(email, password, name)
            .then(_ => {
                notify("Register successful! Logging in...")
                return service.login(email, password)
            })
            .then(_ => {
                notify("Login successful")
                onLogin()
            })
            .catch((err) => notify(err, false))
    }

    function submit() {
        // checking user input
        if (!email.trim().length || !password.trim().length || !name.trim().length){
            notify("You need to supply a email, password and organization name.", false)
        } else if (password !== passwordRepeat){
            notify("The given passwords do not match", false)
        }
        else{
            register()
        }
    }

    return (
        <div className="text-center border-primary card container p-5">
            <h1 className="text-primary text-left">Tribute</h1>
            <h5 className="text-secondary text-left">For orgs</h5>
            <div className="h3 mb-3 font-weight-normal">Register as an organization</div>
            <input className="form-control mb-2" placeholder="Email" required
                   autoFocus
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password" className="form-control mb-1" placeholder="Password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password" className="form-control mb-2" placeholder="Confirm password" required
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
            />
            <input className="form-control mb-3" placeholder="Organization name" required
                   autoFocus
                   value={name}
                   onChange={(e) => setName(e.target.value)}
            />
            <button className="mb-3 btn btn-lg btn-primary btn-block" onClick={submit}>Register</button>
            <a className="text-center btn-link" href="/login">Already have an account? Sign in</a>
            <a className="mt-3 text-center btn-link" href="/tribute-app">Are you a volunteer?</a>
        </div>
    )

}

export default RegisterPage