import Loading from "./Loading";
import React, {useEffect, useState} from "react";

function ElementHeader({id, fetcher, ref}) {
    const [element, setElement] = useState({})

    function getElement(){
        fetcher(id).then(setElement)
    }

    useEffect(getElement, [])

    if (!element.name) return <Loading/>;

    return (
        <div>
            <a href={`${ref}/${id}`}>{element.name}</a>
        </div>
    )
}

function renderElementHeader({owner_id, owner_type}, volunteersService, orgsService) {
    if (owner_type === "volunteer")
        return <ElementHeader id={owner_id} fetcher={volunteersService.getVolunteer} ref={"/volunteers"}/>
    else return <ElementHeader id={owner_id} fetcher={orgsService.getOrg} ref={"/orgs"}/>
}