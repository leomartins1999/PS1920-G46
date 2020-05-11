package com.example.tributeapp.model.dtos

import com.example.tributeapp.api.BASE_URL
import org.json.JSONObject
import java.io.Serializable

class Event(val json: JSONObject): Serializable{

    val id = json.getString("_id")
    val org_id = json.getString("org_id")
    val name = json.getString("name")
    val description = json.getString("description")
    val date = json.getString("date")
    val location = json.getString("location")
    val imageLink =
        if (!json.getString("imageLink").startsWith("/images")) json.getString("imageLink")
        else BASE_URL + json.getString("imageLink")
    val interested =
        getUsers(json.getJSONObject("interested"))
    val participants =
        getUsers(json.getJSONObject("participants"))

    override fun toString(): String {
        return "Event(id='$id', org_id='$org_id', name='$name', description='$description', date='$date', location='$location', imageLink='$imageLink', interested=$interested, participants=$participants)"
    }


}