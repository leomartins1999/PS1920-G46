import {API_BASE_PATH} from "../api/RequestExecutor";
import React from "react";
import {useImage} from "react-image";

function Image({link, cache, fb}) {
    link = `${API_BASE_PATH}${link}`
    if (!cache) link.concat(`?${performance.now()}`)

    const {src} = useImage({
        srcList: [link, fb],
        useSuspense: false
    })

    return (
        <img
            className="card-img-top m-3 align-self-center text-center"
            src={src}
            alt=""
            style={{"width": "12rem"}}
        />
    )
}

export default Image