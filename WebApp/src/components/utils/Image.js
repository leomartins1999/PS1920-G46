import {API_BASE_PATH} from "../../api/RequestExecutor";
import React from "react";
import {useImage} from "react-image";

function Image({type, id, cache = '', fb, width = "12rem"}) {
    const link = `${API_BASE_PATH}/images/${type}/${id}?${cache}`

    const {src} = useImage({
        srcList: [link, fb],
        useSuspense: false
    })

    return (
        <img
            className="card-img-top m-3 align-self-center text-center"
            src={src}
            alt=""
            style={{"width": width}}
        />
    )
}

export default Image