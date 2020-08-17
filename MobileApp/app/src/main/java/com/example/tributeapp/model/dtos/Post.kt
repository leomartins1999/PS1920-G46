package com.example.tributeapp.model.dtos

import com.example.tributeapp.api.getImageLink
import com.example.tributeapp.model.ModelUtils
import org.json.JSONObject
import kotlin.String

data class Post(private val json: JSONObject){

    val id: String = json.getString("_id")
    val ownerID: String = json.getString("owner_id")
    val ownerType: String = json.getString("owner_type")

    val description: String = json.getString("body")
    val time: Long = json.getLong("time")

    val imageLink: String
        get() = getImageLink("posts", id)

    val likes =
        getUsers(json.getJSONObject("likes"))

    override fun toString(): String {
        return "Post(json=$json, id='$id', owner_id='$ownerID', description='$description', time=$time)"
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