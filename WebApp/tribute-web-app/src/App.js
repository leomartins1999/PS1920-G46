import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import PostsPage from "./PostsPage/PostsPage";
import VolunteersPage from "./VolunteersPage/VolunteersPage";
import OrgsPage from "./OrgsPage/OrgsPage";
import EventsPage from "./EventsPage/EventsPage";
import HomePage from "./HomePage/HomePage";
import NavBar from "./Components/NavBar";

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