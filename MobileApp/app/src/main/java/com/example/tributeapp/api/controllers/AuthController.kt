package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.request_executor.RequestExecutor
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

    fun register(user: String, email: String, password: String, onSuccess: () -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        val data = JSONObject()
        data.put("name", user)
        body.put("email", user)
        body.put("password", user)
        body.put("usertype", "volunteer")
        body.put("data", data)

        executor.register(
            body,
            onSuccess,
            onError
        )
    }

}