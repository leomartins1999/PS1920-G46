import React, {useState} from "react";

function PostForm({service}){
    const [text, setText] = useState("")

    function createPost(){
        if (text) service.createPost(text).then(res => {if (res) setText("")})
    }

    return (
        <div className="card m-3">
            <div className="card-header h2">Create Post</div>
            <div className="card-body">
                <textarea
                    placeholder={"Write something..."}
                    className="form-control mb-2"
                    value={text} onChange={(e) => setText(e.target.value)}
                    rows="3"/>
            </div>
            <div className="card-footer text-right">
                <button onClick={createPost} className="btn btn-primary"> Create Post</button>
            </div>
        </div>
    )
}

export default PostForm