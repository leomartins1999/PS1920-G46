package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.model.dtos.User
import com.example.tributeapp.model.dtos.Volunteer
import org.json.JSONObject

class AuthController(private val executor: RequestExecutor) {

    fun login(email: String, password: String, onSuccess: (User) -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        body.put("email", email)
        body.put("password", password)

        executor.login(
            body,
            {
                onSuccess(User(it))
            },
            onError
        )
    }

    fun register(email: String, password: String, volunteer: Volunteer, onSuccess: () -> Unit, onError: () -> Unit){
        throw NotImplementedError()
    }

}