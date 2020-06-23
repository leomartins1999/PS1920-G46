import React, {useState} from "react";

function PostForm({service}){
    const [text, setText] = useState("")

    return (
        <div className="container bg-light p-3">
            <h3>Create post</h3>
            <textarea placeholder={"Write something..."} className="form-control mb-2" value={text} onChange={(e) => setText(e.target.value)} required rows="3"/>
            <button onClick={createPost} className="btn btn-primary"> Create Post</button>
        </div>
    )

    function createPost(){
        service.createPost(text)
            .then(res => {
                if (res) setText("")
            })
    }
}

export default PostForm