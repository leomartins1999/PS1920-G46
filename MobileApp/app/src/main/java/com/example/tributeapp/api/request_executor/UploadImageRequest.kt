package com.example.tributeapp.api.request_executor

import android.os.AsyncTask
import android.util.Log
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.bumptech.glide.load.model.stream.HttpUriLoader
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.App
import java.net.HttpURLConnection
import java.net.URL

const val FILE_KEY = "file"

class UploadImageRequest(
    private val image: ByteArray,
    url: String,
    onSuccess: Response.Listener<String>,
    onError: Response.ErrorListener
) : StringRequest(Method.POST, url, onSuccess, onError) {

    override fun getParams(): MutableMap<String, String> {
        val map = mutableMapOf<String, String>()

        map[FILE_KEY] = String(image)

        return map
    }

    override fun getBodyContentType(): String {
        return "multipart/form-data"
    }

    override fun getBody(): ByteArray {
        Log.v(APP_TAG, String(super.getBody()))
        return super.getBody()
    }

    override fun getHeaders(): MutableMap<String, String> {
        // retrieve existing cookies
        val map = super.getHeaders().toMutableMap()

        // add session cookie
        map["Cookie"] = App.session!!.user.token

        // return cookies
        return map
    }
}