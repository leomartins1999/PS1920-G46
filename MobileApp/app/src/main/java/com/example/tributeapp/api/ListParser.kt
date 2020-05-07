package com.example.tributeapp.api

import android.os.AsyncTask
import org.json.JSONObject

class ListParser<T>(
        private val onSuccess: (List<T>) -> Unit,
        private val constructor: (JSONObject) -> T
) : AsyncTask<String, Int, List<T>>() {

    override fun doInBackground(vararg params: String?): List<T> {
        return JSONObject(params[0]!!)
                .getJSONArray("body")
                .let { 0.until(it.length()).map { i -> it.getJSONObject(i) } }
                .map(constructor)
    }

    override fun onPostExecute(result: List<T>?) {
        onSuccess(result!!)
    }
}