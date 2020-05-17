package com.example.tributeapp.ui.view_models

import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Event

class EventViewModel(val event: Event, private val api: APIService) : ViewModel() {

    fun interested(onSuccess: () -> Unit, onError: () -> Unit) {
        api.interestedInEvent(
            event.id,
            {
                when (val idx = event.interested.indexOfFirst { it.id == App.session!!.user.id }) {
                    -1 -> event.interested.add(App.session!!.user)
                    else -> event.interested.removeAt(idx)
                }
                onSuccess()
            },
            onError
        )
    }

}