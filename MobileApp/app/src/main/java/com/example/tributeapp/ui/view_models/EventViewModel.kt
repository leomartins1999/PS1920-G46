package com.example.tributeapp.ui.view_models

import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Event
import com.example.tributeapp.model.dtos.updateUser

class EventViewModel(val event: Event, private val api: APIService) : ViewModel() {

    fun interested(onSuccess: () -> Unit, onError: () -> Unit) {
        api.interestedInEvent(
            event.id,
            {
                event.interested.updateUser(App.session!!.user)
                onSuccess()
            },
            onError
        )
    }

}