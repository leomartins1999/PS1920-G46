package com.example.tributeapp.api.parser

import android.util.Log
import com.example.tributeapp.APP_TAG
import org.json.JSONObject

class ListParser<T>(
        private val onSuccess: (List<T>) -> Unit,
        private val constructor: (JSONObject) -> T
) : Parser<List<T>>() {

    override fun onPostExecute(result: List<T>?) {
        onSuccess(result!!)
    }

    override fun doInBackground(vararg params: JSONObject?): List<T> {
        return params[0]!!
            .getJSONArray("results")
            .let { 0.until(it.length()).map { i -> it.getJSONObject(i) } }
            .map(constructor)
    }
}