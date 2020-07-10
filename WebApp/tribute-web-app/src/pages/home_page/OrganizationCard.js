import React, {useState} from "react"
import ClickableIcon from "../../components/ClickableIcon";
import {GlobeIcon, MailIcon} from "@primer/octicons-react";

const MOCK_ORG = {
    "_id": "5ef0f340ea92970de919db5e",
    "name": "Organization 1",
    "description": "description 1",
    "phone": "+351 987654321",
    "mail": "leonardo0001@live.com.pt",
    "siteLink": "www.org.com",
    "facebookLink": "www.facebook.com/org",
    "followers": {},
    "following": {},
    "imageLink": "/images/orgs/5ef0f340ea92970de919db5e"
}

function OrganizationCard({service}) {

    const [org, setOrg] = useState(MOCK_ORG)
    const [editing, setEditing] = useState(false);

    function renderNonEditingMode(){
        return (
            <div className="m-3 card">
                <div className="card-header">{org.name}</div>
                <div className="card-body">
                    <p>{org.description}</p>
                    <p>{org.phone}</p>
                    <p>{Object.keys(org.followers).length}</p>
                    <p>{Object.keys(org.following).length}</p>
                </div>
                <div className="card-footer d-inline-flex justify-content-around">
                    {org.mail? <ClickableIcon component={<MailIcon size={24} />} link={`mailto:${org.mail}`}/> : null}
                    <ClickableIcon link={`//${org.siteLink}`} component={<GlobeIcon size={24} />}/>
                    <ClickableIcon link={`//${org.facebookLink}`} component={"Facebook"}/>
                </div>
            </div>
        )
    }

    function renderEditingMode(){
        return renderNonEditingMode()
    }

    return editing?
        renderEditingMode() : renderNonEditingMode();

}

export default OrganizationCard