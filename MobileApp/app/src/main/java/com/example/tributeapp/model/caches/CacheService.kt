package com.example.tributeapp.model.caches

import android.util.Log
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.model.dtos.Volunteer

class CacheService{

    private val api: APIService by lazy { App.api }

    private val volunteerCache
            = Cache<Volunteer>{ key, onSuccess -> api.getVolunteer(key, onSuccess){onError("volunteer", key)} }

    private val orgCache
            = Cache<Org>{ key, onSuccess -> api.getOrg(key, onSuccess){onError("org", key)} }

    fun addVolunteer(volunteer: Volunteer){
        volunteerCache.add(volunteer.id, volunteer)
    }

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit){
        volunteerCache.request(key, onSuccess)
    }

    fun addOrg(org: Org) {
        orgCache.add(org.id, org)
    }

    fun getOrg(key: String, onSuccess: (Org) -> Unit) {
        orgCache.request(key, onSuccess)
    }

    private fun onError(type: String, key: String){
        Log.v(APP_TAG, "Error fetching $type - $key")
    }

}