import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import NavBar from "./components/NavBar";

import PostsPage from "./posts_page/PostsPage";
import VolunteersPage from "./volunteers_page/VolunteersPage";
import OrgsPage from "./orgs_page/OrgsPage";
import EventsPage from "./events_page/EventsPage";
import HomePage from "./home_page/HomePage";

import RequestExecutor from "./api/RequestExecutor"
import VolunteersService from "./api/VolunteersService"
import OrgsService from "./api/OrgsService"
import PostsService from "./api/PostsService"
import EventsService from "./api/EventsService"

const executor = RequestExecutor()

const volunteersService = VolunteersService(executor)
const orgsService = OrgsService(executor)
const postsService = PostsService(executor)
const eventsService = EventsService(executor)

function RouteRenderer() {
    return (
        <Switch>
            <Route path="/posts" render={() =>
                <PostsPage
                    service={postsService}
                />
            }/>
            <Route path="/volunteers" render={() =>
                <VolunteersPage
                    service={volunteersService}
                />
            }/>
            <Route path="/orgs" render={() =>
                <OrgsPage
                    service={orgsService}
                />
            }/>
            <Route path="/events" render={() =>
                <EventsPage
                    service={eventsService}
                />
            }/>
            <Route path="/home" render={() =>
                <HomePage/>
            }/>
            <Route>
                <Redirect to={"/home"}/>
            </Route>
        </Switch>
    )
}

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <NavBar/>
                <RouteRenderer/>
            </div>
        )
    }

}

export default App;