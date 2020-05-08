package com.example.tributeapp.model.dtos

import com.example.tributeapp.api.BASE_URL
import org.json.JSONObject

data class Post(private val json: JSONObject){
    val id = json.getString("_id")
    val owner_id = json.getString("owner_id")
    val owner_type = json.getString("owner_type")
    val description = json.getString("description")
    val imageLink =
        if (!json.getString("imageLink").startsWith("/images")) json.getString("imageLink")
        else BASE_URL + json.getString("imageLink")
    val time = json.getLong("time")
    val likes =
        getUsers(json.getJSONObject("likes"))

    override fun toString(): String {
        return "Post(json=$json, id='$id', owner_id='$owner_id', description='$description', imageLink='$imageLink', time=$time)"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Post

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    fun getNumberOfLikes(): Int {
        return likes.size
    }


}