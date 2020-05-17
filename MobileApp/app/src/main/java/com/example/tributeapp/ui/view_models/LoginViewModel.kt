package com.example.tributeapp.ui.view_models

import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService

class LoginViewModel(private val api: APIService) : ViewModel() {

    fun login(email: String, password: String, onSuccess: () -> Unit, onError: () -> Unit) {
        api.login(email, password, {
            App.newSession(it)
            onSuccess()
        }, onError)
    }

}