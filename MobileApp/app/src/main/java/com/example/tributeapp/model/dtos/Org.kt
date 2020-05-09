package com.example.tributeapp.model.dtos

import com.example.tributeapp.App
import org.json.JSONObject

data class Org(private val json: JSONObject): Entity(){

    override val id: String = json.getString("_id")
    override val name: String = json.getString("name")
    val description: String? = json.optString("description")
    val phone: String? = json.optString("phone")
    val mail: String? = json.optString("mail")
    val siteLink: String? = json.optString("siteLink")
    val facebookLink: String? = json.optString("facebookLink")
    val imageLink =
        if (!json.optString("imageLink").startsWith("/images")) json.optString("imageLink")
        else com.example.tributeapp.api.BASE_URL + json.optString("imageLink")
    val followers = getUsers(json.getJSONObject("followers"))
    val following = getUsers(json.getJSONObject("following"))

    init {
        App.cacheService.addOrg(this)
    }

    override fun toString(): String {
        return "Org(id='$id', name='$name', description='$description', phone='$phone', mail='$mail', siteLink='$siteLink', facebookLink='$facebookLink', imageLink='$imageLink', followers=$followers, following=$following)"
    }

}