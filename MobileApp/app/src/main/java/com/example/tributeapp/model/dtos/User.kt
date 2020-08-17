package com.example.tributeapp.model.dtos

import android.os.Parcelable
import kotlinx.android.parcel.Parcelize
import org.json.JSONObject
import kotlin.String

fun getUsers(json: JSONObject): MutableList<User> {
    val users = mutableListOf<User>()
    json.keys().forEach {
        users.add(
            User(
                it!!,
                json.getString(it)
            )
        )
    }
    return users
}

fun MutableList<User>.updateUser(user: User){
    when(val idx = this.indexOfFirst { it.id == user.id }){
        -1 -> this.add(user)
        else -> this.removeAt(idx)
    }
}

@Parcelize
class User(val id: String, val type: String, val token: String? = null) : Parcelable {

    constructor(json: JSONObject) :
            this(json.getString("id"), json.getString("user_type"), json.optString("token"))

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }

    override fun toString(): String {
        return "User(id='$id', type='$type', token=$token)"
    }

}