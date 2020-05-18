package com.example.tributeapp.ui.view_models;

import androidx.lifecycle.ViewModel
import com.example.tributeapp.api.APIService

public class RegisterViewModel(private val api: APIService) :ViewModel() {

    fun register(user: String, email: String, password: String, onSuccess: () -> Unit, onError: () -> Unit){
        api.register(user, email, password, onSuccess, onError)
    }
}
