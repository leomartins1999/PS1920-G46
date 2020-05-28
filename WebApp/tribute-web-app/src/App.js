import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import PostsPage from "./posts_page/PostsPage";
import VolunteersPage from "./volunteers_page/VolunteersPage";
import OrgsPage from "./orgs_page/OrgsPage";
import EventsPage from "./events_page/EventsPage";
import HomePage from "./home_page/HomePage";
import NavBar from "./components/NavBar";

function RouteRenderer() {
    return (
        <Switch>
            <Route path="/posts" render={() =>
                <PostsPage/>
            }/>
            <Route path="/volunteers" render={() =>
                <VolunteersPage/>
            }/>
            <Route path="/orgs" render={() =>
                <OrgsPage/>
            }/>
            <Route path="/events" render={() =>
                <EventsPage/>
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