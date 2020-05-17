package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.EVENTS_URL
import com.example.tributeapp.api.RequestExecutor
import com.example.tributeapp.api.eventsInterested
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Event
import org.json.JSONObject

class EventsController(private val executor: RequestExecutor) {

    fun getEvents(onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        executor.get(EVENTS_URL, ListParser(onSuccess) { Event(it) }, onError)

    fun interested(eventID: String, onSuccess: () -> Unit, onError: () -> Unit){
        executor.put(eventsInterested(eventID), JSONObject(), {onSuccess()}, onError)
    }

}