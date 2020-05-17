package com.example.tributeapp.model.dtos

import android.os.Parcel
import android.os.Parcelable
import com.example.tributeapp.api.BASE_URL
import org.json.JSONObject
import kotlin.String

class Event(private val json: JSONObject): Parcelable{

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

    constructor(parcel: Parcel) : this(JSONObject(parcel.readString()!!))

    override fun writeToParcel(dest: Parcel?, flags: Int) {
        dest!!.writeString(json.toString())
    }

    override fun describeContents(): Int {
        return 0
    }

    override fun toString(): String {
        return "Event(id='$id', org_id='$org_id', name='$name', description='$description', date='$date', location='$location', imageLink='$imageLink', interested=$interested, participants=$participants)"
    }

    companion object CREATOR : Parcelable.Creator<Event> {
        override fun createFromParcel(parcel: Parcel): Event {
            return Event(parcel)
        }

        override fun newArray(size: Int): Array<Event?> {
            return arrayOfNulls(size)
        }
    }


}