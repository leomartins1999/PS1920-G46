package com.example.tributeapp.model.dtos

import com.example.tributeapp.App
import org.json.JSONObject
import java.io.Serializable

data class Volunteer(private val json: JSONObject){

    val id: String = json.getString("_id")
    val name: String = json.getString("name")
    val description: String = json.getString("description")
    val linkedInLink: String = json.getString("linkedInLink")
    val imageLink: String =
        if (!json.getString("imageLink").startsWith("/images")) json.getString("imageLink")
        else com.example.tributeapp.api.BASE_URL + json.getString("imageLink")
    val following =
        getUsers(json.getJSONObject("following"))
    val followers =
        getUsers(json.getJSONObject("followers"))

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
        return id.hashCode() ?: 0
    }

    companion object{
        val cacheService = App.cacheService
    }

}