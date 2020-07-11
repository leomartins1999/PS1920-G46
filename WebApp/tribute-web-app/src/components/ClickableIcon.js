import React from "react";

function ClickableIcon({component, link}) {

    return link? (<a href={link} target="_blank">{component}</a>) : null
}

export default ClickableIcon