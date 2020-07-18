import {API_BASE_PATH} from "../api/RequestExecutor";
import React from "react";

function Image({link, cache}) {
    link = `${API_BASE_PATH}${link}`
    if (!cache) link.concat(`?${performance.now()}`)

    return (
        <img
            className="card-img m-3 align-self-center text-center"
            src={link}
            alt={cache ? "" : "(no image)"}
            style={{"width": "12rem"}}
        />
    )
}

export default Image