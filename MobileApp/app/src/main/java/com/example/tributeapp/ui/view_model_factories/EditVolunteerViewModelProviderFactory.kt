package com.example.tributeapp.ui.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.EditVolunteerViewModel
import com.example.tributeapp.ui.view_models.EventsViewModel

class EditVolunteerViewModelProviderFactory: ViewModelProvider.Factory{

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return EditVolunteerViewModel(App.api) as T
    }

}