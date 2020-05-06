package com.example.tributeapp.api

import android.os.AsyncTask
import org.json.JSONObject

class Parser<T>(
    private val constructor: (JSONObject) -> T,
    private val onSuccess: List<T> 
) : AsyncTask<String, Int, List<T>>() {
    override fun doInBackground(vararg params: String?): List<T> {
        TODO("Not yet implemented")
    }

    override fun onPostExecute(result: List<T>?) {

    }
}