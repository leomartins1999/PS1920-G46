import React from "react";

function ImageForm({image, setImage}) {
    return (
        <div className="mb-3">
            <h5>Select image</h5>
            <div className="custom-file mb-2 w-25">
                <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label className="custom-file-label text-left">{image ? image.name : '(no image)'}</label>
            </div>
            <div/>
            <button className="btn btn-danger" onClick={() => setImage(null)}>Remove image</button>
        </div>
    )
}

export default ImageForm