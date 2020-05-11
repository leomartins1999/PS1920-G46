package com.example.tributeapp.ui.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.EventsViewModel

class EventsViewModelProviderFactory: ViewModelProvider.Factory{

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return EventsViewModel(App.api) as T
    }

}