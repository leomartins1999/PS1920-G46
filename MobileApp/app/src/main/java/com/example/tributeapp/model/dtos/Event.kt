package com.example.tributeapp.model.dtos

import android.os.Parcel
import android.os.Parcelable
import android.text.format.DateFormat
import com.example.tributeapp.App
import com.example.tributeapp.api.getImageLink
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.*
import kotlin.String

data class Event(private val json: JSONObject) : Parcelable {

    val id: String = json.getString("_id")
    val owner_id: String = json.getString("owner_id")

    val name: String = json.getString("name")
    val description: String = json.getString("description")

    val date = getDate(json)
    val location: String? = json.optString("location")
    val imageLink: String
        get() = getImageLink("events", id)

    val interested = getUsers(json.getJSONObject("interested"))

    val nrInterested = json.getInt("nrInterested")

    constructor(parcel: Parcel) : this(JSONObject(parcel.readString()!!))

    override fun writeToParcel(dest: Parcel?, flags: Int) {
        dest!!.writeString(json.toString())
    }

    override fun describeContents(): Int {
        return 0
    }

    private fun getDate(json: JSONObject): Date? {
        val d = json.optLong("date")
        return if (d == 0L) null else Date(d)
    }

    fun getDateString(): String = if (date == null) "" else App.dateFormat.format(date)

    override fun toString(): String {
        return "Event(id='$id', org_id='$owner_id', name='$name', description='$description', date='$date', location='$location', imageLink='$imageLink', nrInterested=$nrInterested,)"
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