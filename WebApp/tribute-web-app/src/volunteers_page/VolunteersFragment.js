import React from "react";
import renderEntity from "./VolunteerCard";

class VolunteersFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            volunteers: []
        }
    }

    fetchVolunteers() {
        return this.props.service.getVolunteers()
            .then((volunteers) => {
                console.log(volunteers)

                if (volunteers) this.setState({volunteers: volunteers})
            })
    }

    componentDidMount() {
        this.fetchVolunteers()
            .then(() => {
                this.timerID = setInterval(() => this.fetchVolunteers(), 2000)
            })
    }

    componentWillUnmount() {
        if (this.timerID)
            clearInterval(this.timerID)
    }

    render() {
        const volunteers = this.state.volunteers

        let volunteersRender = volunteers.map(renderEntity)

        return (
            <div className="jumbotron border-primary m-5">
                <div className="text-center h1">Volunteers</div>
                <div className="row justify-content-md-center">{volunteersRender}</div>
            </div>
        )
    }

}

export default VolunteersFragment