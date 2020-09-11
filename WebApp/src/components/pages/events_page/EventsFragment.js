import React from "react";
import renderEventCard from "./EventCard";
import Loading from "../../utils/Loading";
import {notify} from "../../utils/Notifications";

class EventsFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            filterEvents: false
        }
    }

    fetchEvents() {
        return this.props.service
            .getEvents(this.state.filterEvents? this.props.id : null)
            .then(events => this.setState({events: events}))
            .catch(err => notify(err, false))
    }

    filterEvents = (e) => {
        this.setState({filterEvents: e.target.checked, events: []})
    }

    componentDidMount() {
        this.fetchEvents()
            .then(() => {
                this.timerID = setInterval(() => this.fetchEvents(), 2000)
            })
    }

    componentWillUnmount() {
        if (this.timerID)
            clearInterval(this.timerID)
    }

    render() {
        let events = this.state.events

        events = events.length === 0 ?
            <Loading/> :
            events.map(e => renderEventCard(e, this.props.orgs_service))

        return (
            <div className="card border-primary m-3">
                <div className="card-header text-center">
                    Check events for you
                    <input type="checkbox" className="ml-3" onChange={this.filterEvents}/>
                </div>
                <div className="card-body">
                    {events}
                </div>
            </div>
        )
    }
}

export default EventsFragment