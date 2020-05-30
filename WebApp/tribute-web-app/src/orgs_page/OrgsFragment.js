import React from "react";
import renderEntity from "../volunteers_page/VolunteerCard";

class OrgsFragment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            orgs: []
        }
    }

    fetchOrgs() {
        return this.props.service.getOrgs()
            .then((orgs) => {
                if (orgs) this.setState({orgs: orgs})
            })
    }

    componentDidMount() {
        this.fetchOrgs()
            .then(() => {
                this.timerID = setInterval(() => this.fetchOrgs(), 2000)
            })
    }

    componentWillUnmount() {
        if (this.timerID)
            clearInterval(this.timerID)
    }

    render() {
        const orgs = this.state.orgs

        let orgsRender = orgs.map(renderEntity)

        return (
            <div className="jumbotron border-primary m-5">
                <div className="text-center h1">Orgs</div>
                <div className="row justify-content-md-center">{orgsRender}</div>
            </div>
        )
    }

}

export default OrgsFragment