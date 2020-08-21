package com.example.tributeapp.api.parser

import android.os.AsyncTask
import org.json.JSONObject

abstract class Parser<T>: AsyncTask<JSONObject, Int, T>()