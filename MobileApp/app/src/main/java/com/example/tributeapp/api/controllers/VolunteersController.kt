package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.RequestExecutor
import com.example.tributeapp.api.VOLUNTEERS_URL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.api.volunteerURL
import com.example.tributeapp.model.dtos.Volunteer

class VolunteersController(private val executor: RequestExecutor) {

    fun getVolunteers(onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        executor.get(VOLUNTEERS_URL, ListParser(onSuccess) { Volunteer(it) }, onError)

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        executor.get(volunteerURL(key), SingletonParser(onSuccess) { Volunteer(it) }, onError)

}