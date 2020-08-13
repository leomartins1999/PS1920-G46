package com.example.tributeapp.api.request_executor

import android.os.AsyncTask
import android.util.Log
import com.android.volley.Response
import com.example.tributeapp.APP_TAG
import java.net.URL

const val FILE_KEY = "file"

class UploadImageRequest(
    private val image: ByteArray,
    private val url: String,
    onSuccess: Response.Listener<String>,
    onError: Response.ErrorListener
) : AsyncTask<Unit, Unit, String>() {

    override fun doInBackground(vararg params: Unit?): String {
        val url = URL(url)
        val connection = url.openConnection()
        TODO()
    }

    override fun onPostExecute(result: String?) {
        Log.v(APP_TAG, result!!)
    }
}