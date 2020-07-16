import Loading from "./Loading";
import React, {useEffect, useState} from "react";

function ElementHeader({id, fetcher, link}) {
    const [element, setElement] = useState({})

    function getElement() {
        fetcher(id).then(setElement)
    }

    useEffect(getElement, [])

    if (!element.name) return <Loading/>;

    return (
        <div>
            <a href={`${link}/${id}`}>{element.name}</a>
        </div>
    )
}

export function renderOrgHeader(owner_id, orgsService) {
    return <ElementHeader id={owner_id} fetcher={orgsService.getOrg} link={"/orgs"}/>
}

export function renderElementHeader(owner_id, owner_type, volunteersService, orgsService) {
    if (owner_type === "volunteer")
        return <ElementHeader id={owner_id} fetcher={volunteersService.getVolunteer} link={"/volunteers"}/>
    else renderOrgHeader(owner_id, orgsService)
}