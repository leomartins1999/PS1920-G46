package com.example.tributeapp.api

const val BASE_URL = "https://tribute-api.duckdns.org/api"
//const val BASE_URL = "http://89.115.68.247/api"

const val LOGIN_URL = "login"

const  val REGISTER_URL = "register"

const val VOLUNTEERS_URL = "volunteers"
fun volunteerURL(id: String) = "volunteers/$id"
fun updateVolunteerURL(id: String) = "auth/${volunteerURL(id)}"
fun followVolunteerURL(id: String) = "auth/${volunteerURL(id)}/follow"
fun volunteerImage(id: String) = "auth/images/volunteers/$id"
fun getImageLink(type: String, id: String) = "$BASE_URL/images/$type/$id"

const val ORGS_URL = "orgs"
fun orgURL(id: String) = "orgs/$id"
fun followOrgURL(id: String) = "auth/${orgURL(id)}/follow"

const val POSTS_URL = "posts"
const val EXECUTE_POST = "auth/$POSTS_URL"
fun likeURL(id: String) = "auth/posts/$id/like"

const val EVENTS_URL = "events"
fun eventsInterestedURL(id: String) = "auth/events/$id/interested"