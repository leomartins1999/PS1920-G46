import React, {useState} from "react";
import {notify} from "../../utils/Notifications";
import ImageForm from "../../utils/ImageForm";

function PostForm({service}) {
    const [text, setText] = useState("")
    const [image, setImage] = useState(null)

    function createPost() {
        if (text) service
            .createPost(text)
            .then(res => {
                setText("")
                notify("Successfully created post!")
                if (image) service.updatePostImage(res.id, image)
            })
            .catch(err => notify(err, false))
    }

    return (
        <div className="card border-primary m-3">
            <div className="card-header h2">Create Post</div>
            <div className="card-body text-center align-items-center">
                <textarea
                    placeholder={"Write something..."}
                    className="form-control mb-2"
                    value={text} onChange={(e) => setText(e.target.value)}
                    rows="2"/>
                <ImageForm image={image} setImage={setImage}/>
            </div>
            <div className="card-footer text-right">
                <button onClick={createPost} className="btn btn-primary"> Create Post</button>
            </div>
        </div>
    )
}

export default PostForm