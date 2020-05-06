package com.example.tributeapp.api

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.model.Post

const val BASE_URL = "http://tribute-api.duckdns.org/api"
const val POSTS_URL = "posts"

class API(ctx: Context){

    private val queue = Volley.newRequestQueue(ctx)

    fun getPosts(onSuccess: (List<Post>) -> Unit){
        val parser = ListParser(onSuccess){Post(it)}
        val req = StringRequest(
            Request.Method.GET,
            buildRequestURL(POSTS_URL),
            Response.Listener { parser.execute(it) },
            Response.ErrorListener {Log.v(APP_TAG, "Error: $it")}
        )

        Log.v(APP_TAG, "Executing request to url: ${buildRequestURL(POSTS_URL)}")
        queue.add(req)
    }

    private fun buildRequestURL(url: String)
            = "$BASE_URL/$url"

}