package com.example.tributeapp.api

const val BASE_URL = "https://tribute-api.duckdns.org/api"
//const val BASE_URL = "http://89.115.68.247/api"

const val LOGIN_URL = "login"

const val REGISTER_URL = "register"

fun volunteersURL(query: String) = "volunteers?name=$query"
fun volunteerURL(id: String) = "volunteers/$id"
fun updateVolunteerURL(id: String) = "auth/${volunteerURL(id)}"
fun followVolunteerURL(id: String) = "auth/${volunteerURL(id)}/follow"
fun volunteerImage(id: String) = "auth/images/volunteers/$id"
fun getImageLink(type: String, id: String) = "$BASE_URL/images/$type/$id"

fun orgsURL(query: String) = "orgs?name=$query"
fun orgURL(id: String) = "orgs/$id"
fun followOrgURL(id: String) = "auth/${orgURL(id)}/follow"

fun posts_url(filter: Boolean): String {
    return if (filter) "auth/posts" else "posts"
}

const val EXECUTE_POST = "auth/posts"
fun likeURL(id: String) = "auth/posts/$id/like"

fun eventsUrl(filter: Boolean): String{
    return if (filter) "auth/events" else "events"
}
fun eventsInterestedURL(id: String) = "auth/events/$id/interested"