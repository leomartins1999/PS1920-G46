import React, {useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import NavBar from "./components/NavBar";

import PostsPage from "./pages/posts_page/PostsPage";
import VolunteersPage from "./pages/volunteers_page/VolunteersPage";
import OrgsPage from "./pages/orgs_page/OrgsPage";
import EventsPage from "./pages/events_page/EventsPage";
import OrganizationPage from "./pages/org_page/OrganizationPage";
import LoginPage from "./pages/login_page/LoginPage";

import RequestExecutor from "./api/RequestExecutor"
import VolunteersService from "./api/VolunteersService"
import OrgsService from "./api/OrgsService"
import PostsService from "./api/PostsService"
import EventsService from "./api/EventsService"
import AuthService from "./api/AuthService"
import RegisterPage from "./pages/register_page/RegisterPage";
import EventPage from "./pages/event_page/EventPage";
import VolunteerPage from "./pages/volunteer_page/VolunteerPage";
import {Notifications} from "react-push-notification";

const executor = RequestExecutor()

const volunteersService = VolunteersService(executor)
const orgsService = OrgsService(executor)
const postsService = PostsService(executor)
const eventsService = EventsService(executor)
const authService = AuthService(executor)

function RouteRenderer() {
    const [auth, setAuth] = useState(authService.getSession)

    return auth
        ? authRouter() : unauthRouter();

    function authRouter() {
        return (
            <div className="container">
                <NavBar/>
                <Switch>
                    <Route exact path="/posts" render={() =>
                        <PostsPage
                            posts_service={postsService}
                            volunteers_service={volunteersService}
                            orgs_service={orgsService}
                            id={auth}
                        />
                    }/>
                    <Route exact path="/volunteers">
                        <VolunteersPage service={volunteersService}/>
                    </Route>
                    <Route path="/volunteers/:volunteer_id" render={({match}) =>
                        <VolunteerPage
                            service={volunteersService}
                            id={auth}
                            volunteer_id={match.params.volunteer_id}/>
                    }/>
                    <Route exact path="/orgs">
                        <OrgsPage service={orgsService}/>
                    </Route>
                    <Route path="/orgs/:org_id" render={({match}) =>
                        <OrganizationPage
                            service={orgsService}
                            id={auth}
                            org_id={match.params.org_id}
                        />
                    }/>
                    <Route exact path="/events" render={() =>
                        <EventsPage
                            service={eventsService}
                            orgs_service={orgsService}
                            id={auth}/>
                    }/>
                    <Route path="/events/:event_id" render={({match}) =>
                        <EventPage
                            service={eventsService}
                            volunteerService={volunteersService}
                            session_id={auth}
                            event_id={match.params.event_id}/>
                    }/>
                    <Route exact path="/logout" render={() => {
                        authService.logout();
                        setAuth(null);
                    }}/>
                    <Route exact path="/home">
                        <Redirect to={`/orgs/${auth}`}/>
                    </Route>
                    <Route>
                        <Redirect to={`/orgs/${auth}`}/>
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

function App() {
    return (
        <div className="App">
            <Notifications position="top-right"/>
            <RouteRenderer/>
        </div>
    )
}

export default App;