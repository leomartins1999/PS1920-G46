import React, {useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import NavBar from "./components/NavBar";

import PostsPage from "./pages/posts_page/PostsPage";
import VolunteersPage from "./pages/volunteers_page/VolunteersPage";
import OrgsPage from "./pages/orgs_page/OrgsPage";
import EventsPage from "./pages/events_page/EventsPage";
import HomePage from "./pages/home_page/HomePage";
import LoginPage from "./pages/login_page/LoginPage";

import RequestExecutor from "./api/RequestExecutor"
import VolunteersService from "./api/VolunteersService"
import OrgsService from "./api/OrgsService"
import PostsService from "./api/PostsService"
import EventsService from "./api/EventsService"
import AuthService from "./api/AuthService"
import RegisterPage from "./pages/register_page/RegisterPage";
import {Button} from "react-bootstrap";

const executor = RequestExecutor()

const volunteersService = VolunteersService(executor)
const orgsService = OrgsService(executor)
const postsService = PostsService(executor)
const eventsService = EventsService(executor)
const authService = AuthService(executor)

function RouteRenderer() {
    // return (
    //     <Switch>
    //         <Route path="/login" render={() =>
    //             <LoginPage service={authService}/>
    //         }/>
    //         <Route path="/posts" render={() =>
    //             <PostsPage
    //                 service={postsService}
    //             />
    //         }/>
    //         <Route path="/volunteers" render={() =>
    //             <VolunteersPage
    //                 service={volunteersService}
    //             />
    //         }/>
    //         <Route path="/orgs" render={() =>
    //             <OrgsPage
    //                 service={orgsService}
    //             />
    //         }/>
    //         <Route path="/events" render={() =>
    //             <EventsPage
    //                 service={eventsService}
    //             />
    //         }/>
    //         <Route path="/home" render={() =>
    //             <HomePage
    //                 posts_service = {postsService}
    //                 user_id = {authService.getSession()}
    //             />
    //         }/>
    //         <Route>
    //             <Redirect to={"/home"}/>
    //         </Route>
    //     </Switch>
    // )

    const [auth, setAuth] = useState(authService.getSession)

    return auth
        ? authRouter() : unauthRouter();

    function authRouter() {
        return (
            <div className="container">
                <NavBar/>
                <Switch>
                    <Route path="/home" render={() =>
                        <HomePage service={orgsService}/>
                    }/>
                    <Route path="/logout" render={() => {
                        authService.logout();
                        setAuth(null);
                    }}
                    />
                    <Route>
                        <Redirect to="/home"/>
                    </Route>
                </Switch>
            </div>
        )
    }

    function unauthRouter() {
        return (
            <Switch>
                <Route path="/login" render={() =>
                    <LoginPage service={authService} onLogin={() => setAuth(authService.getSession())}/>
                }/>
                <Route path="/register" render={() =>
                    <RegisterPage service={authService} onLogin={() => setAuth(authService.getSession)}/>
                }/>
                <Route>
                    <Redirect to="/login"/>
                </Route>
            </Switch>
        )
    }
}

function App(){
    return(
        <div className="App">
            <RouteRenderer/>
        </div>
    )
}

export default App;