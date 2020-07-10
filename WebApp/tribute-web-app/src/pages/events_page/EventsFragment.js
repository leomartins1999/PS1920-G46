import React from "react";
import renderEventCard from "./EventCard";

class EventsFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    fetchEvents() {
        return this.props.service.getEvents()
            .then(events => {
                if (events) this.setState({events: events})
            })
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

        events = events.map(renderEventCard)

        return (
            <div>

                <div className="jumbotron border-primary m-5">
                    <div className="text-center h1">Events</div>
                    {events}
                </div>
            </div>
        )
    }
}

export default EventsFragment