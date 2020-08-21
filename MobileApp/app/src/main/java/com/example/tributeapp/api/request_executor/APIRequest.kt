package com.example.tributeapp.api.request_executor

import com.android.volley.NetworkResponse
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.example.tributeapp.App
import org.json.JSONObject

/**
 * Re-implementation of JsonObjectRequest for usage w/ tribute api
 */
open class APIRequest(
    method: Int,
    url: String,
    body: JSONObject,
    onSuccess: Response.Listener<JSONObject>,
    onError: Response.ErrorListener
) : JsonObjectRequest(method, url, body, onSuccess, onError) {

    override fun parseNetworkResponse(response: NetworkResponse?): Response<JSONObject> {
        try {
            // retrieving response
            val resp = super.parseNetworkResponse(response)

            // error handling
            if (resp.result == null)
                return Response.error(
                    APIException(
                        "Invalid response!",
                        APIError()
                    )
                )

            // retrieving body
            val body =
                if (resp.result.optJSONArray("body") != null)
                    JSONObject().put("results", resp.result.getJSONArray("body"))
                else resp.result.getJSONObject("body")

            if (resp.result.getString("status") == "error")
                return Response.error(
                    APIException(
                        "Response status is error",
                        APIError(body)
                    )
                )

            // returning body
            return Response.success(body, resp.cacheEntry)
        } catch (err: Error) {
            return Response.error(
                APIException(
                    "Parsing response error",
                    err
                )
            )
        }
    }

    override fun getHeaders(): MutableMap<String, String> {
        // retrieve existing cookies
        val map = super.getHeaders().toMutableMap()

        // add session cookie
        if (App.session!!.hasSession)
            map["Cookie"] = App.session!!.user.token

        // return cookies
        return map
    }

}