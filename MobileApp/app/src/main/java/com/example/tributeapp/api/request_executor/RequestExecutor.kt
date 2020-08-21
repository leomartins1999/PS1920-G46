package com.example.tributeapp.api.request_executor

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.BASE_URL
import com.example.tributeapp.api.LOGIN_URL
import com.example.tributeapp.api.parser.Parser
import org.json.JSONObject

class RequestExecutor(ctx: Context) {

    private val queue = Volley.newRequestQueue(ctx)

    private fun buildRequestURL(url: String): String {
        return "$BASE_URL/$url"
    }

    fun <T> get(
        url: String,
        parser: Parser<T>,
        onError: () -> Unit
    ) {
        val reqUrl = buildRequestURL(url)

        val req = APIRequest(
            Request.Method.GET,
            reqUrl,
            JSONObject(),
            Response.Listener { parser.execute(it) },
            Response.ErrorListener {
                Log.v(APP_TAG, "Error: $it")
                onError()
            }
        )

        Log.v(APP_TAG, "Executing request to url: $reqUrl")
        queue.add(req)
    }

    fun put(url: String, onSuccess: () -> Unit, onError: () -> Unit, body: JSONObject = JSONObject()) {
        val reqURL = buildRequestURL(url)

        val req = APIRequest(
            Request.Method.PUT,
            reqURL,
            body,
            Response.Listener { onSuccess() },
            Response.ErrorListener { onError() }
        )

        Log.v(APP_TAG, "Executing request to url: $reqURL")
        queue.add(req)
    }

    fun post(url: String, body: JSONObject, onSuccess: () -> Unit, onError: () -> Unit){
        val reqURL = buildRequestURL(url)

        val req = APIRequest(
            Request.Method.POST,
            reqURL,
            body,
            Response.Listener { onSuccess() },
            Response.ErrorListener { onError() }
        )

        Log.v(APP_TAG, "Executing request to url: $reqURL")
        queue.add(req)
    }

    fun login(body: JSONObject, onSuccess: (JSONObject) -> Unit, onError: () -> Unit) {
        val reqURL = buildRequestURL(LOGIN_URL)

        val req = LoginRequest(
            reqURL,
            body,
            Response.Listener {
                onSuccess(it!!)
            },
            Response.ErrorListener {
                Log.v(APP_TAG, "$it")
                onError()
            }
        )

        Log.v(APP_TAG, "Executing request to url: $reqURL")
        queue.add(req)
    }

    fun uploadImage(url: String, imageContent: ByteArray, onSuccess: () -> Unit, onError: () -> Unit) {
        val reqURL = buildRequestURL(url)

        val req = UploadImageRequest(
            imageContent,
            reqURL,
            Response.Listener {
                Log.v(APP_TAG, it)
            },
            Response.ErrorListener {
                it.printStackTrace()
            }
        )

        Log.v(APP_TAG, String(imageContent))

        Log.v(APP_TAG, "Executing request to url: $reqURL")
        queue.add(req)
    }

}