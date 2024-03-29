import React, {useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import NavBar from "./components/utils/NavBar";

import PostsPage from "./components/pages/posts_page/PostsPage";
import VolunteersPage from "./components/pages/volunteers_page/VolunteersPage";
import OrgsPage from "./components/pages/orgs_page/OrgsPage";
import EventsPage from "./components/pages/events_page/EventsPage";
import OrganizationPage from "./components/pages/org_page/OrganizationPage";
import LoginPage from "./components/pages/login_page/LoginPage";
import MobileAppPage from "./components/pages/mobile_app_page/MobileAppPage";

import RequestExecutor from "./api/RequestExecutor"
import VolunteersService from "./api/VolunteersService"
import OrgsService from "./api/OrgsService"
import PostsService from "./api/PostsService"
import EventsService from "./api/EventsService"
import AuthService from "./api/AuthService"
import RegisterPage from "./components/pages/register_page/RegisterPage";
import EventPage from "./components/pages/event_page/EventPage";
import VolunteerPage from "./components/pages/volunteer_page/VolunteerPage";
import {Notifications} from "react-push-notification";
import {notify} from "./components/utils/Notifications";

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
                        notify("Successfully logged out!", false)
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
                <Route path="/tribute-app" render={() =>
                    <MobileAppPage/>
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