package com.example.tributeapp.api

const val BASE_URL = "http://tribute-api.duckdns.org/api"

const val LOGIN_URL = "login"

const  val REGISTER_URL = "register"

const val VOLUNTEERS_URL = "volunteers"
fun volunteerURL(id: String) = "volunteers/$id"
fun followVolunteerURL(id: String) = "auth/${volunteerURL(id)}/follow"

const val ORGS_URL = "orgs"
fun orgURL(id: String) = "orgs/$id"
fun followOrgURL(id: String) = "auth/${orgURL(id)}/follow"

const val POSTS_URL = "posts"
const val EXECUTE_POST = "auth/$POSTS_URL"
fun likeURL(id: String) = "auth/posts/$id/like"

const val EVENTS_URL = "events"
fun eventsInterestedURL(id: String) = "auth/orgs/events/$id/interested"