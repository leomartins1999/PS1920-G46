package com.example.tributeapp.ui.view_model_factories

import android.content.Intent
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.activities.EVENT_KEY
import com.example.tributeapp.ui.view_models.EventViewModel

class EventViewModelProviderFactory(private val intent: Intent):
    ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return EventViewModel(intent.getParcelableExtra(EVENT_KEY)!!, App.api) as T
    }

}