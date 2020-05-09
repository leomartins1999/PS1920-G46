package com.example.tributeapp.activities.view_model_factories

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.activities.view_models.OrgsViewModel

class OrgsViewModelProviderFactory: ViewModelProvider.Factory{

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return OrgsViewModel(App.api) as T
    }

}