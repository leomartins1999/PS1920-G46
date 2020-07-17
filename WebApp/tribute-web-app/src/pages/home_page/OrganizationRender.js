import {API_BASE_PATH} from "../../api/RequestExecutor";
import {DeviceMobileIcon, GlobeIcon, MailIcon, PersonIcon} from "@primer/octicons-react";
import ClickableIcon from "../../components/ClickableIcon";
import React from "react";

function OrganizationRender({org}) {
    return (
        <div className="card m-3">
            <div className="card-header h2">{org.name}</div>
            <img
                className="card-img m-3 align-self-center text-center"
                src={`${API_BASE_PATH}${org.imageLink}?${performance.now()}`}
                alt="(no image)"
                style={{"width": "12rem"}}
            />
            <div className="card-body text-center">
                <p className="text-justify m-3 border">{org.description}</p>
                <div className="d-inline-flex">
                    <DeviceMobileIcon size={24}/>
                    <p>{org.phone ? org.phone : "(no phone number)"}</p>
                </div>
                <div/>
                <div className="d-inline-flex">
                    {Object.keys(org.followers).length} Followers
                    <PersonIcon size={24}/>
                    {Object.keys(org.following).length} Following
                </div>
            </div>
            <div className="card-footer d-inline-flex justify-content-center">
                <div className="row container-fluid">
                    <div className="col-4 text-center">
                        {org.mail ? <ClickableIcon component={<MailIcon size={24}/>}
                                                   link={`mailto:${org.mail}`}/> : null}
                    </div>
                    <div className="col-4 text-center">
                        <ClickableIcon link={`//${org.siteLink}`} component={<GlobeIcon size={24}/>}/>
                    </div>
                    <div className="col-4 text-center">
                        <ClickableIcon link={`//${org.facebookLink}`} component={"Facebook"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizationRender