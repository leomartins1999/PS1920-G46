package com.example.tributeapp.ui.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.VolunteerViewModel

class VolunteerViewModelProviderFactory(private val volunteerID: String): ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return VolunteerViewModel(
            volunteerID,
            { id, onSuccess -> App.cacheService.getVolunteer(id, onSuccess)},
            App.api
        ) as T
    }

}