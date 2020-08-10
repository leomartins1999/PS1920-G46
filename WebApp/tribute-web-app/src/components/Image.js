import {API_BASE_PATH} from "../api/RequestExecutor";
import React, {useState} from "react";
import {useImage} from "react-image";

function Image({type, id, cache = '', fb}) {
    const link = `${API_BASE_PATH}/images/${type}/${id}?${cache}`

    const {src} = useImage({
        srcList: [link, fb],
        useSuspense: false
    })

    console.log(fb)

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