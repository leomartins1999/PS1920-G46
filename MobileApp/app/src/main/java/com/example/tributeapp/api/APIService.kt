package com.example.tributeapp.api

import android.content.Context
import android.os.AsyncTask
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Event
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.model.dtos.Post
import com.example.tributeapp.model.dtos.Volunteer


class APIService(ctx: Context) {

    private val queue = Volley.newRequestQueue(ctx)

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        get(POSTS_URL, ListParser(onSuccess) { Post(it) }, onError)

    fun getEvents(onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        get(EVENTS_URL, ListParser(onSuccess) { Event(it) }, onError)

    fun getVolunteers(onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        get(VOLUNTEERS_URL, ListParser(onSuccess) { Volunteer(it) }, onError)

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        get(volunteerURL(key), SingletonParser(onSuccess) { Volunteer(it) }, onError)

    fun getOrg(key: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        get(orgURL(key), SingletonParser(onSuccess) { Org(it) }, onError)

    fun getOrgs(onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        get(ORGS_URL, ListParser(onSuccess) { Org(it) }, onError)

    private fun buildRequestURL(url: String) = "$BASE_URL/$url"

    private fun <T> get(
        url: String,
        parser: AsyncTask<String, Int, T>,
        onError: () -> Unit
    ) {
        val reqUrl = buildRequestURL(url)

        val req = StringRequest(
            Request.Method.GET,
            reqUrl,
            Response.Listener { parser.execute(it) },
            Response.ErrorListener {
                Log.v(APP_TAG, "Error: $it")
                onError()
            }
        )

        Log.v(APP_TAG, "Executing request to url: $reqUrl")
        queue.add(req)
    }

    fun likePost(userID: String, postID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        onSuccess()
    }

}