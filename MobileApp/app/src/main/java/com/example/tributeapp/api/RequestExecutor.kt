package com.example.tributeapp.api

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.parser.Parser

class RequestExecutor(ctx: Context){

    private val queue = Volley.newRequestQueue(ctx)

    fun <T> get(
        url: String,
        parser: Parser<T>,
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

    /**
     * todo: add limit and skip
     */
    private fun buildRequestURL(url: String): String {
        return "$BASE_URL/$url"
    }

}