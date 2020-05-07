package com.example.tributeapp.model

import org.json.JSONObject
import java.io.Serializable

data class Volunteer(private val json: JSONObject): Serializable{

    val id = json.getString("_id")
    val name = json.getString("name")
    val description = json.getString("description")
    val linkedInLink = json.getString("linkedInLink")
    val imageLink = json.getString("imageLink")
    val following = getUsers(json.getJSONObject("following"))
    val followers = getUsers(json.getJSONObject("followers"))

    override fun toString(): String {
        return "Volunteer(json=$json, id='$id', name='$name', description='$description', linkedInLink='$linkedInLink', imageLink='$imageLink')"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Volunteer

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode() ?: 0
    }


}