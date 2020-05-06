package com.example.tributeapp

import android.app.Application
import com.example.tributeapp.api.API

const val APP_TAG = "TRIBUTE_APP"

class App: Application(){

    companion object{
        lateinit var api: API
    }

    override fun onCreate() {
        super.onCreate()
        api = API(applicationContext)
    }

}