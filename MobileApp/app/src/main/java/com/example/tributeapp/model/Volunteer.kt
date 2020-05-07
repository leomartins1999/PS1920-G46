package com.example.tributeapp.model

import org.json.JSONObject
import java.io.Serializable

data class Volunteer(private val json: JSONObject): Serializable{

    val id = json.getString("_id")
    val name = json.getString("name")
    val description = json.getString("description")
    val linkedInLink = json.getString("linkedInLink")
    val imageLink = json.getString("imageLink")
    //val following = json.getJSONObject("following")
    //val followers = json.getJSONObject("followers")

    override fun toString(): String {
        return "Volunteer(json=$json, id='$id', name='$name', description='$description', linkedInLink='$linkedInLink', imageLink='$imageLink')"
    }

}