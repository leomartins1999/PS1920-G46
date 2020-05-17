package com.example.tributeapp.api.request_executor

import com.android.volley.VolleyError
import org.json.JSONObject

class APIException(message: String, error: Error): VolleyError(message, error)

class APIError(message: String = "Details unknown."): Error(message){

    private var module: String? = null
    private var type : String? = null

    constructor(json: JSONObject): this(json.getString("message")){
        module = json.getString("module")
        type = json.getString("type")
    }

    override fun toString(): String {
        return if (module != null)
            "APIError(module=$module, type=$type, message=$message)"
        else
            "APIError($message)"
    }

}