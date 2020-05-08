package com.example.tributeapp.api

import android.os.AsyncTask
import org.json.JSONObject

class SingletonParser<T>(
    private val onSuccess: (T) -> Unit,
    private val constructor: (JSONObject) -> T
): AsyncTask<String, Int, T>(){

    override fun doInBackground(vararg params: String?): T {
        return constructor(JSONObject(params[0]!!)
            .getJSONObject("body"))
    }

    override fun onPostExecute(result: T) {
        onSuccess(result)
    }

}