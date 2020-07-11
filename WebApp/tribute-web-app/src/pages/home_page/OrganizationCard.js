import React, {useState} from "react"
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

function OrganizationCard({service}) {

    const [org, setOrg] = useState(MOCK_ORG)

    const [editing, setEditing] = useState(false);

    const [description, setDescription] = useState(org.description);
    const [phone, setPhone] = useState(org.phone)
    const [mail, setMail] = useState(org.mail)
    const [site, setSite] = useState(org.siteLink)
    const [facebook, setFacebook] = useState(org.facebookLink)

    function getOrg() {
        console.log("getting org...")
    }

    function update() {
        console.log("updating...")
    }

    function renderNonEditingMode() {
        return (
            <div>
                <div className="m-3 card">
                    <div className="card-header h2">{org.name}</div>
                    <img
                        className="card-img m-3 align-self-center"
                        src={org.imageLink}
                        alt="Org's icon"
                        style={{"width": "12rem"}}
                    />
                    <div className="card-body text-center">
                        <p className="text-justify">{org.description}</p>
                        <div className="d-inline-flex">
                            <DeviceMobileIcon size={24}/>
                            <p>{org.phone}</p>
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
                <div className="m-3 card">
                    <div className="card-header h2">{org.name}</div>
                    <div className="card-body text-center">
                        <textarea
                            className="form-control mb-3"
                            value={description}
                            placeholder="Description..."
                            onChange={(e) => setDescription(e.target.value)}/>
                        <div className="d-inline-flex mb-3">
                            <DeviceMobileIcon size={24}/>
                            <input
                                className="form-control"
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
                    <div className="card-footer d-inline-flex justify-content-around form-group row">
                        <div className="col-xs-2 d-inline-flex">
                            Email
                            <input
                                className="form-control"
                                value={mail}
                                placeholder="Mail"
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className="col-xs-2 d-inline-flex">
                            Site
                            <input
                                className="form-control"
                                value={site}
                                placeholder="Site"
                                onChange={(e) => setSite(e.target.value)}
                            />
                        </div>
                        <div className="col-xs-2 d-inline-flex">
                            Facebook
                            <input
                                className="form-control"
                                value={facebook}
                                placeholder="Facebook link"
                                onChange={(e) => setSite(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary mr-3" onClick={update}>Submit changes</button>
                    <button type="button" className="btn btn-danger" onClick={() => setEditing(false)}>Stop editing
                    </button>
                </div>
            </div>
        )
    }

    return editing ?
        renderEditingMode() : renderNonEditingMode();

}

export default OrganizationCard