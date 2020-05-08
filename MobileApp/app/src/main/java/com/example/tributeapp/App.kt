package com.example.tributeapp

import android.app.Application
import com.example.tributeapp.api.API
import com.example.tributeapp.caches.CacheService

const val APP_TAG = "TRIBUTE_APP"

class App: Application(){

    companion object{
        lateinit var api: API
        lateinit var cacheService: CacheService
    }

    override fun onCreate() {
        super.onCreate()
        api = API(applicationContext)
        cacheService = CacheService()
    }

}