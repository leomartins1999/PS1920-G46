package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.*
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Volunteer
import org.json.JSONObject

class VolunteersController(private val executor: RequestExecutor) {

    fun getVolunteers(onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        executor.get(VOLUNTEERS_URL, ListParser(onSuccess) { Volunteer(it) }, onError)

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        executor.get(volunteerURL(key), SingletonParser(onSuccess) { Volunteer(it) }, onError)

    fun followVolunteer(volunteerID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        executor.put(followVolunteerURL(volunteerID), onSuccess, onError)

    fun updateVolunteer(volunteerID: String, description: String?, linkedinLink: String?, onSuccess: () -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        if (!description.isNullOrEmpty()) body.put("description", description)
        if (!linkedinLink.isNullOrEmpty()) body.put("linkedInLink", linkedinLink)

        executor.put(updateVolunteerURL(volunteerID), onSuccess, onError, body)
    }

    fun updateImage(volunteerID: String, imageContent: ByteArray, onSuccess: () -> Unit, onError: () -> Unit) {
        executor.uploadImage(volunteerImage(volunteerID), imageContent, onSuccess, onError)
    }

}