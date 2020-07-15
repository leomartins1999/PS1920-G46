import React, {useState} from "react";

function PostForm({service}) {
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)

    function createPost() {
        if (text) service.createPost(text).then(res => {
            if (res) {
                setText("")
                if (image) service.updatePostImage(res.id, image)
            }
        })
    }

    return (
        <div className="card m-3">
            <div className="card-header h2">Create Post</div>
            <div className="card-body text-center align-items-center">
                <textarea
                    placeholder={"Write something..."}
                    className="form-control mb-2"
                    value={text} onChange={(e) => setText(e.target.value)}
                    rows="2"/>
                <p className="text-center">Post image</p>
                <input
                    type="file"
                    className="form-control-file mr-2 text-center mb-3"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Select image"
                />
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setImage(null)}
                >Clear image
                </button>
            </div>
            <div className="card-footer text-right">
                <button onClick={createPost} className="btn btn-primary"> Create Post</button>
            </div>
        </div>
    )
}

export default PostForm