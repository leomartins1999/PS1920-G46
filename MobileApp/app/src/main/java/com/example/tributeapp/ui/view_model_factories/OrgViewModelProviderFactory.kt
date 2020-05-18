package com.example.tributeapp.ui.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.OrgViewModel

class OrgViewModelProviderFactory(private val orgID: String): ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return OrgViewModel(
            orgID,
            { id, onSuccess -> App.cacheService.getOrg(id, onSuccess)},
            App.api
        ) as T
    }

}