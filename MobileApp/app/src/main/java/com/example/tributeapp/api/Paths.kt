package com.example.tributeapp.api

const val BASE_URL = "http://89.115.68.247/api"

const val LOGIN_URL = "login"

const val VOLUNTEERS_URL = "volunteers"
fun volunteerURL(key: String) = "volunteers/$key"

const val ORGS_URL = "orgs"
fun orgURL(key: String) = "orgs/$key"

const val POSTS_URL = "posts"
fun likeURL(key: String) = "auth/posts/$key/like"

const val EVENTS_URL = "events"