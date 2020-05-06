package com.example.tributeapp.model

import org.json.JSONObject

data class Post(val json: JSONObject){
    val id = json.getString("_id")
    val owner_id = json.getString("owner_id")
    val description = json.getString("description")
    val imageLink = json.getString("imageLink")
    val time = json.getLong("time")
    val likes = json.getJSONObject("likes")

    override fun toString(): String {
        return "Post(json=$json, id='$id', owner_id='$owner_id', description='$description', imageLink='$imageLink', time=$time)"
    }

}