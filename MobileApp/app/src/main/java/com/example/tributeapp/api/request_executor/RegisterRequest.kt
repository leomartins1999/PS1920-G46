package com.example.tributeapp.api.request_executor

import com.android.volley.Response
import org.json.JSONObject

class RegisterRequest (
    url: String,
    body: JSONObject,
    onSuccess: Response.Listener<JSONObject>,
    onError: Response.ErrorListener
) : APIRequest(Method.POST, url, body, onSuccess, onError)