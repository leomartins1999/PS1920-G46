import React from "react";
import renderOrg from "./OrgCard";
import Loading from "../../components/Loading";
import {SearchIcon} from "@primer/octicons-react";
import {notify} from "../../components/Notifications";

class OrgsFragment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            search: "",
            newSearch: ""
        }
    }

    fetchOrgs() {
        return this.props.service.getOrgs(this.state.search)
            .then((orgs) => this.setState({orgs: orgs}))
            .catch((err) => notify(err, false))
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

    onChangeNewSearch = (e) => {
        this.setState({newSearch: e.target.value})
    }

    submitSearch = () => {
        this.setState({orgs: [], search: this.state.newSearch})
    }

    clearSearch = () => {
        this.setState({
            orgs: this.state.search ? [] : this.state.orgs,
            search: "",
            newSearch: ""
        })
    }

    render() {
        const orgs = this.state.orgs

        let orgsRender = orgs.length ? orgs.map(renderOrg) : <Loading/>

        return (
            <div className="card border-primary m-5">
                <div className="card-header text-center h1">Orgs</div>
                <div className="card-body text-center">
                    <div className="d-inline-flex align-items-center">
                        <input className="form-control" placeholder="Search..." value={this.state.newSearch} onChange={this.onChangeNewSearch}/>
                        <button className="btn btn-link" onClick={this.submitSearch}><SearchIcon size={24}/> </button>
                        <button className="btn btn-light" onClick={this.clearSearch}>Clear</button>
                    </div>
                    <div className="row justify-content-md-center">{orgsRender}</div>
                </div>
            </div>
        )
    }

}

export default OrgsFragment