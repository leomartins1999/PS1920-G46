package com.example.tributeapp.api.parser

import org.json.JSONObject

class SingletonParser<T>(
    private val onSuccess: (T) -> Unit,
    private val constructor: (JSONObject) -> T
): Parser<T>(){

//    override fun doInBackground(vararg params: String?): T {
//        return constructor(JSONObject(params[0]!!)
//            .getJSONObject("body"))
//    }

    override fun doInBackground(vararg params: JSONObject?) = constructor(params[0]!!)

    override fun onPostExecute(result: T) {
        onSuccess(result)
    }

}