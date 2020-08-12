package com.example.tributeapp.model.dtos

import com.example.tributeapp.App
import org.json.JSONObject

data class Volunteer(private val json: JSONObject): Entity(){

    override val id: String = json.getString("_id")
    override val name: String = json.getString("name")
    override val followers = getUsers(json.getJSONObject("followers"))
    override val imageLink: String =
        if (!json.optString("imageLink").startsWith("/images")) json.optString("imageLink")
        else com.example.tributeapp.api.BASE_URL + json.optString("imageLink")

    val description: String =
        if (json.optString("description", "") == "null") ""
        else json.optString("description", "")
    val linkedInLink: String =
        if (json.optString("linkedInLink", "") == "null") ""
        else json.optString("linkedInLink", "")


    val following =
        getUsers(json.getJSONObject("following"))

    init {
        cacheService.addVolunteer(this)
    }

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
        return id.hashCode()
    }

    companion object{
        val cacheService = App.cacheService
    }

}