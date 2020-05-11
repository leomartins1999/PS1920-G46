package com.example.tributeapp.api

const val BASE_URL = "http://tribute-api.duckdns.org/api"

const val POSTS_URL = "posts"
const val ORGS_URL = "orgs"
const val VOLUNTEERS_URL = "volunteers"
const val EVENTS_URL = "events"

fun volunteerURL(key: String) = "volunteers/$key"
fun orgURL(key: String) = "orgs/$key"