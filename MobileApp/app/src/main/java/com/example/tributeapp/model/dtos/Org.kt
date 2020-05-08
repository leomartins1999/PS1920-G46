package com.example.tributeapp.model.dtos

import com.example.tributeapp.App
import org.json.JSONObject

data class Org(private val json: JSONObject){

    val id = json.getString("_id")
    val name = json.getString("name")
    val description = json.getString("description")
    val phone = json.getString("phone")
    val mail = json.getString("mail")
    val siteLink = json.getString("siteLink")
    val facebookLink = json.getString("facebookLink")
    val imageLink =
        if (!json.getString("imageLink").startsWith("/images")) json.getString("imageLink")
        else com.example.tributeapp.api.BASE_URL + json.getString("imageLink")
    val followers = getUsers(json.getJSONObject("followers"))
    val following = getUsers(json.getJSONObject("following"))

    init {
        App.cacheService.addOrg(this)
    }

}