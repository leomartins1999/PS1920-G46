package com.example.tributeapp.model

import org.json.JSONObject

fun getUsers(json: JSONObject): MutableList<User> {
    val users = mutableListOf<User>()
    json.keys().forEach { users.add(User(it!!, json.getString(it))) }
    return users
}

data class User(val id: String, val type: String){

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
        return "User(id='$id', type='$type')"
    }

}