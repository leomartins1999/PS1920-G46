package com.example.tributeapp.model.caches

import com.example.tributeapp.App
import com.example.tributeapp.api.API
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.model.dtos.Volunteer

class CacheService{

    private val api: API by lazy { App.api }

    private val volunteerCache
            = Cache<Volunteer>{ key, onSuccess -> api.getVolunteer(key, onSuccess)}

    private val orgCache
            = Cache<Org>{ key, onSuccess -> api.getOrg(key, onSuccess) }

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit){
        volunteerCache.request(key, onSuccess)
    }

    fun getOrg(key: String, onSuccess: (Org) -> Unit) {
        orgCache.request(key, onSuccess)
    }

    fun addVolunteer(volunteer: Volunteer){
        volunteerCache.add(volunteer.id, volunteer)
    }

    fun addOrg(org: Org) {
        orgCache.add(org.id, org)
    }

}