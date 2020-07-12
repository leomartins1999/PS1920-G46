import React, {useEffect, useState} from "react"
import ClickableIcon from "../../components/ClickableIcon";
import {DeviceMobileIcon, GlobeIcon, MailIcon, PersonIcon} from "@primer/octicons-react";

const MOCK_ORG = {
    "_id": "5ef0f340ea92970de919db5e",
    "name": "Organization 1",
    "description": "Os Bancos Alimentares são Instituições Particulares de Solidariedade Social que lutam contra o desperdício de produtos alimentares, encaminhando-os para distribuição gratuita às pessoas carenciadas.",
    "phone": "+351 987654321",
    "mail": "leonardo0001@live.com.pt",
    "siteLink": "www.org.com",
    "facebookLink": "www.facebook.com/org",
    "followers": {},
    "following": {},
    "imageLink": "https://4.bp.blogspot.com/_aExLWgnhBBY/Sd9D4Gpe4VI/AAAAAAAADy8/QDQC3sWeGbc/s400/bancoalimentar2.jpg"
}

function OrganizationCard({service, id}) {

    const [org, setOrg] = useState({})

    const [editing, setEditing] = useState(false);

    const [description, setDescription] = useState(org.description);
    const [phone, setPhone] = useState(org.phone)
    const [mail, setMail] = useState(org.mail)
    const [site, setSite] = useState(org.siteLink)
    const [facebook, setFacebook] = useState(org.facebookLink)

    useEffect(getOrg, [])

    function getOrg() {
        service.getOrg(id).then(res => {
            console.log(res)
            setOrg(res)
        })
    }

    function updateOrg(){
        service.updateOrg(id, {description, phone, mail, siteLink: site, facebookLink: facebook}).then(res => getOrg())
    }

    function update() {
        setEditing(false)
        setOrg({})
        updateOrg()
    }

    function renderNonEditingMode() {
        return (
            <div>
                <div className="card m-3">
                    <div className="card-header h2">{org.name}</div>
                    <img
                        className="card-img m-3 align-self-center text-center"
                        src={org.imageLink}
                        alt="(no image)"
                        style={{"width": "12rem"}}
                    />
                    <div className="card-body text-center">
                        <p className="text-justify m-3">{org.description}</p>
                        <div className="d-inline-flex">
                            <DeviceMobileIcon size={24}/>
                            <p>{org.phone? org.phone : "(no phone number)"}</p>
                        </div>
                        <div/>
                        <div className="d-inline-flex">
                            {Object.keys(org.followers).length} Followers
                            <PersonIcon size={24}/>
                            {Object.keys(org.following).length} Following
                        </div>
                    </div>
                    <div className="card-footer d-inline-flex justify-content-around">
                        {org.mail ?
                            <ClickableIcon component={<MailIcon size={24}/>} link={`mailto:${org.mail}`}/> : null}
                        <ClickableIcon link={`//${org.siteLink}`} component={<GlobeIcon size={24}/>}/>
                        <ClickableIcon link={`//${org.facebookLink}`} component={"Facebook"}/>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>Edit profile
                    </button>
                </div>
            </div>
        )
    }

    function renderEditingMode() {
        return (
            <div>
                <div className="card m-3">
                    <div className="card-header h2">{org.name}</div>
                    <div className="card-body text-center">
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

    if (!org.name) return (
        <div className="d-flex justify-content-center m-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )

    return editing ?
        renderEditingMode() : renderNonEditingMode();

}

export default OrganizationCard