import React from "react";

function ClickableIcon({component, link}) {

    return link && link !== "//null"? (<a href={link} target="_blank">{component}</a>) : null
}

export default ClickableIcon