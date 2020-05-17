package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.LOGIN_URL
import com.example.tributeapp.api.RequestExecutor
import com.example.tributeapp.model.dtos.User
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

}