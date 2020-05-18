package com.example.tributeapp.ui.view_model_factories;

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.tributeapp.App
import com.example.tributeapp.ui.view_models.RegisterViewModel

class RegisterViewModelProviderFactory:ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return RegisterViewModel(App.api) as T
    }


}
