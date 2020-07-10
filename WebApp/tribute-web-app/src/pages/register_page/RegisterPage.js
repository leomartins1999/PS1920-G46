import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function RegisterPage({service, onLogin}){
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")

    return(
        <div className="text-center card container p-5">
            <div className="h3 mb-3 font-weight-normal">Login</div>
            <input className="form-control mb-1" placeholder="Email" required
                   autoFocus
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password" className="form-control mb-1" placeholder="Password" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input className="form-control mb-3" placeholder="Organization name" required
                   autoFocus
                   value={name}
                   onChange={(e) => setName(e.target.value)}
            />
            <button className="mb-3 btn btn-lg btn-primary btn-block" onClick={submit}>Register</button>
            <a className="text-center btn-link" href="/login">Already have an account? Sign in</a>
        </div>
    )

    function register(){
        service.register(email, password, name).then((res) => {
            console.log(res)
            if (res){
                service.login(email, password).then((res) => {
                    if (res){
                        onLogin()
                        history.push("/home")
                    }
                })
            }else{
                console.log("error registering")
            }
        })
    }

    function submit(){
        register()
    }

}

export default RegisterPage