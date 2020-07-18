import React from "react";
import renderEntity from "./VolunteerCard";
import {SearchIcon} from "@primer/octicons-react";
import ClickableIcon from "../../components/ClickableIcon";
import Loading from "../../components/Loading";

class VolunteersFragment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            volunteers: [],
            search: "",
            newSearch: ""
        }
    }

    fetchVolunteers() {
        return this.props.service.getVolunteers(this.state.search)
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

    onChangeNewSearch = (e) => {
        this.setState({newSearch: e.target.value})
    }

    submitSearch = () => {
        this.setState({volunteers: [], search: this.state.newSearch})
        this.fetchVolunteers()
    }

    render() {
        const volunteers = this.state.volunteers

        let volunteersRender = volunteers.length ? volunteers.map(renderEntity) : <Loading/>

        return (
            <div className="card border-primary m-5">
                <div className="card-header text-center h1">Volunteers</div>
                <div className="card-body text-center">
                    <div className="d-inline-flex align-items-center">
                        <input className="form-control mx-2" placeholder="Search..." value={this.state.newSearch} onChange={this.onChangeNewSearch}/>
                        <button className="btn btn-link" onClick={this.submitSearch}><SearchIcon size={24}/> </button>
                    </div>
                    <div className="row justify-content-md-center">{volunteersRender}</div>
                </div>
            </div>
        )
    }

}

export default VolunteersFragment