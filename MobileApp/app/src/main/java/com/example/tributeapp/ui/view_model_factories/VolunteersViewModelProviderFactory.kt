package com.example.tributeapp.ui.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.VolunteersViewModel

class VolunteersViewModelProviderFactory: ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return VolunteersViewModel(App.api) as T
    }

}