import React from "react";

function Loading(){
    return (
        <div className="d-flex justify-content-center m-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loading