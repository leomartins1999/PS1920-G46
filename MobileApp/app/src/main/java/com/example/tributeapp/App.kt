package com.example.tributeapp

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.caches.CacheService
import com.example.tributeapp.model.dtos.User
import com.example.tributeapp.ui.Session
import com.example.tributeapp.ui.makeToast

const val APP_TAG = "TRIBUTE_APP"

const val PREFERENCES_FILE = "tribute-preferences"
const val PREFERENCE_ID = "preference-id"
const val PREFERENCE_TYPE = "preference-type"
const val PREFERENCE_TOKEN = "preference-token"

class App : Application() {

    companion object {
        lateinit var api: APIService
        lateinit var cacheService: CacheService
        lateinit var sharedPreferences: SharedPreferences
        var session: Session? = null

        private fun getUser(): User {
            return User(
                sharedPreferences.getString(PREFERENCE_ID, null)!!,
                sharedPreferences.getString(PREFERENCE_TYPE, null)!!,
                sharedPreferences.getString(PREFERENCE_TOKEN, null)
            )
        }

        fun newSession(user: User = getUser()) {
            sharedPreferences.edit()
                .putString(PREFERENCE_ID, user.id)
                .putString(PREFERENCE_TYPE, user.type)
                .putString(PREFERENCE_TOKEN, user.token!!)
                .apply()

            session!!.login(user)
        }

        fun endSession() {
            sharedPreferences.edit()
                .remove(PREFERENCE_ID)
                .remove(PREFERENCE_TYPE)
                .remove(PREFERENCE_TOKEN)
                .apply()

            session!!.logout()
        }

        fun checkForSession(): Boolean {
            return sharedPreferences.contains(PREFERENCE_ID) &&
                    sharedPreferences.contains(PREFERENCE_TYPE) &&
                    sharedPreferences.contains(PREFERENCE_TOKEN)
        }
    }

    override fun onCreate() {
        super.onCreate()
        api = APIService(applicationContext)
        cacheService = CacheService()
        sharedPreferences = getSharedPreferences(PREFERENCES_FILE, Context.MODE_PRIVATE)
    }

}