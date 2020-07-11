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
    "imageLink": "/images/orgs/5ef0f340ea92970de919db5e"
}

function OrganizationCard({service}) {

    const [org, setOrg] = useState(MOCK_ORG)
    const [editing, setEditing] = useState(false);

    function renderNonEditingMode(){
        return (
            <div className="m-3 card">
                <div className="card-header h2">{org.name}</div>
                <div className="card-body text-center">
                    
                    <p className="text-justify">{org.description}</p>
                    <div className="d-inline-flex">
                        <DeviceMobileIcon size={24} />
                        <p>{org.phone}</p>
                    </div>
                    <div/>
                    <div className="d-inline-flex">
                        {Object.keys(org.followers).length} Followers
                        <PersonIcon size={24} />
                        {Object.keys(org.following).length} Following
                    </div>
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