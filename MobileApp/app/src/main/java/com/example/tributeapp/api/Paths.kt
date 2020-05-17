package com.example.tributeapp.api

const val BASE_URL = "http://tribute-api.duckdns.org/api"

const val LOGIN_URL = "login"

const val VOLUNTEERS_URL = "volunteers"
fun volunteerURL(volunteerID: String) = "volunteers/$volunteerID"
fun followVolunteerURL(volunteerID: String) = "auth/${volunteerURL(volunteerID)}/follow"

const val ORGS_URL = "orgs"
fun orgURL(key: String) = "orgs/$key"

const val POSTS_URL = "posts"
fun likeURL(postID: String) = "auth/posts/$postID/like"

const val EVENTS_URL = "events"
fun eventsInterestedURL(eventID: String) = "auth/orgs/events/$eventID/interested"