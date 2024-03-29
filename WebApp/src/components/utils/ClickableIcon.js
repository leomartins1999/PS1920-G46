import React from "react";

function ClickableIcon({component, link}) {

    return link && link !== "//" && link !== "//null"? (<a href={link} target="_blank" rel="noopener noreferrer">{component}</a>) : null
}

export default ClickableIcon