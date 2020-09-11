import {DeviceMobileIcon, GlobeIcon, MailIcon, PersonIcon} from "@primer/octicons-react";
import ClickableIcon from "../../utils/ClickableIcon";
import React from "react";
import Image from "../../utils/Image";

function OrganizationRender({org, stamp}) {
    return (
        <div className="card border-primary m-3">
            <div className="card-header h2">{org.name}</div>
            <div className="card-body text-center">
                <Image type={'orgs'} id={org._id} cache={stamp} fb="images/org.svg" width="20rem"/>
                <p className="text-justify m-3 border">{org.description}</p>
                <div className="d-inline-flex">
                    <DeviceMobileIcon size={24}/>
                    <p>{org.phone ? org.phone : "(no phone number)"}</p>
                </div>
                <div/>
                <div className="d-inline-flex">
                    {org.nrFollowers} Followers
                    <PersonIcon size={24}/>
                    {org.nrFollowing} Following
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