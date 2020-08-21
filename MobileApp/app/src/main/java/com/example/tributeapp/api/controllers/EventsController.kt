package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.eventsUrl
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.eventsInterestedURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Event

class EventsController(private val executor: RequestExecutor) {

    fun getEvents(filter: Boolean, onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        executor.get(eventsUrl(filter), ListParser(onSuccess) { Event(it) }, onError)

    fun interested(eventID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        executor.put(eventsInterestedURL(eventID), onSuccess, onError)
    }

}