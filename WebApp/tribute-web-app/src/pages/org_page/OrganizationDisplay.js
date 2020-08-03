import React, {useEffect, useState} from "react"
import {DeviceMobileIcon, PersonIcon} from "@primer/octicons-react";
import Loading from "../../components/Loading";
import OrganizationRender from "./OrganizationRender";
import FollowButton from "../../components/FollowButton";
import {notify} from "../../components/Notifications";

function OrganizationDisplay({service, org_id, id}) {

    const [org, setOrg] = useState({})

    const [editing, setEditing] = useState(false);

    const [description, setDescription] = useState(org.description);
    const [phone, setPhone] = useState(org.phone)
    const [mail, setMail] = useState(org.mail)
    const [site, setSite] = useState(org.siteLink)
    const [facebook, setFacebook] = useState(org.facebookLink)

    const [image, setImage] = useState(null)

    useEffect(getOrg, [])

    function getOrg() {
        service
            .getOrg(org_id)
            .then(res => {
                setDescription(res.description)
                setPhone(res.phone)
                setMail(res.mail)
                setSite(res.siteLink)
                setFacebook(res.facebookLink)
                setOrg(res)
            })
            .catch(err => notify(err, false))
    }

    function updateOrg() {
        service
            .updateOrg(org_id, {description, phone, mail, siteLink: site, facebookLink: facebook})
            .then(_ => {
                notify("Successfully updated org!")
                return Promise.resolve()
            })
            .then(getOrg)
            .catch(err => notify(err, false))

        if (image) service
            .updateOrgImage(org_id, image)
            .then(getOrg)
            .catch(err => notify(err, false))
    }

    function followOrg() {
        service.followOrg(org_id)
            .then(_ => {
                notify(`Followed ${org.name}`)
                return Promise.resolve()
            })
            .then(getOrg)
            .catch(err => notify(err, false))
    }

    function update() {
        setEditing(false)
        setOrg({})

        updateOrg()
    }

    function follow() {
        setOrg({})

        followOrg()
    }

    if (!org.name) return <Loading/>

    return editing ? renderEditing() : render();

    function render() {
        const options = org_id === id ?
            <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={() => setEditing(true)}
            >Edit</button> :
            <FollowButton isFollowing={org.followers[id]} onClick={follow}/>

        return (
            <div>
                <OrganizationRender org={org}/>
                <div className="d-flex justify-content-center">
                    {options}
                </div>
            </div>
        )
    }

    function renderEditing() {
        return (
            <div>
                <div className="card m-3">
                    <div className="card-header h2">{org.name}</div>
                    <div className="card-body text-center">
                        <p>New image</p>
                        <input
                            type="file"
                            className="form-control-file mr-2 text-center mb-3"
                            onChange={(e) => setImage(e.target.files[0])}
                            placeholder="Select image"
                        />
                        <textarea
                            className="form-control mb-3"
                            value={description}
                            placeholder="Description..."
                            onChange={(e) => setDescription(e.target.value)}/>
                        <div className="d-inline-flex mb-3 align-items-center">
                            <DeviceMobileIcon size={24}/>
                            <input
                                className="form-control ml-2"
                                value={phone}
                                placeholder="Phone number"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div/>
                        <div className="d-inline-flex">
                            {Object.keys(org.followers).length} Followers
                            <PersonIcon size={24}/>
                            {Object.keys(org.following).length} Following
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-around m-0 form-group row">
                        <div className="col-xs-2 d-inline-flex align-items-center">
                            Email
                            <input
                                className="form-control ml-2"
                                value={mail}
                                placeholder="Mail"
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className="col-xs-2 d-inline-flex align-items-center">
                            Site
                            <input
                                className="form-control ml-2"
                                value={site}
                                placeholder="Site"
                                onChange={(e) => setSite(e.target.value)}
                            />
                        </div>
                        <div className="col-xs-2 d-inline-flex align-items-center">
                            Facebook
                            <input
                                className="form-control ml-2"
                                value={facebook}
                                placeholder="Facebook link"
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary mr-3" onClick={update}>Submit changes</button>
                    <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>Cancel
                    </button>
                </div>
            </div>
        )
    }

}

export default OrganizationDisplay