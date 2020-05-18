package com.example.tributeapp.api

import android.content.Context
import android.util.Log
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.parser.Parser
import com.example.tributeapp.api.request_executor.APIRequest
import com.example.tributeapp.api.request_executor.LoginRequest
import com.example.tributeapp.api.request_executor.RegisterRequest
import org.json.JSONObject

class RequestExecutor(ctx: Context) {

    private val queue = Volley.newRequestQueue(ctx)

    /**
     * todo: add limit and skip
     */
    private fun buildRequestURL(url: String): String {
        return "$BASE_URL/$url"
    }

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

    fun put(url: String, body: JSONObject, onSuccess: (JSONObject) -> Unit, onError: () -> Unit) {
        val reqURL = buildRequestURL(url)

        val req = APIRequest(
            Request.Method.PUT,
            reqURL,
            body,
            Response.Listener {
                onSuccess(it)
            },
            Response.ErrorListener {
                onError()
            }
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

    fun register(body: JSONObject, onSuccess: () -> Unit, onError: () -> Unit) {
        val reqURL = buildRequestURL(REGISTER_URL)

        val req = RegisterRequest(
            reqURL,
            body,
            Response.Listener {
                onSuccess()
            },
            Response.ErrorListener {
                onError()
            }
        )
    }

}