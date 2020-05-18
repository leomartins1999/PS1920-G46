package com.example.tributeapp.api.request_executor

import com.android.volley.NetworkResponse
import com.android.volley.Response
import org.json.JSONObject

/**
 * Specific implementation of APIRequest for login request
 */
class LoginRequest(
    url: String,
    body: JSONObject,
    onSuccess: Response.Listener<JSONObject>,
    onError: Response.ErrorListener
) : APIRequest(Method.POST, url, body, onSuccess, onError) {

    override fun parseNetworkResponse(response: NetworkResponse?): Response<JSONObject> {
        // retrieving response (and testing for errors)
        val resp = super.parseNetworkResponse(response)

        // association cookie token with response
        val json = resp.result.getJSONObject("user_details")
        json.put("token", response!!.headers["Set-Cookie"]!!)

        // launching response
        return Response.success(json, resp.cacheEntry)
    }
}