package com.example.tributeapp

import android.app.Application
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.caches.CacheService
import com.example.tributeapp.model.dtos.User

const val APP_TAG = "TRIBUTE_APP"

class App: Application(){

    companion object{
        lateinit var api: APIService
        lateinit var cacheService: CacheService
        var session: SessionViewModel? = null

        fun newSession(user: User) {
            session!!.login(user)
        }

        fun endSession(){
            session!!.logout()
        }
    }

    override fun onCreate() {
        super.onCreate()
        api = APIService(applicationContext)
        cacheService = CacheService()
    }

}