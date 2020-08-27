package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.REGISTER_URL
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.model.dtos.User
import org.json.JSONObject

class AuthController(private val executor: RequestExecutor) {

    fun login(email: String, password: String, onSuccess: (User) -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        body.put("mail", email)
        body.put("password", password)

        executor.login(body, { onSuccess(User(it)) }, onError)
    }

    fun register(
        user: String,
        email: String,
        password: String,
        onSuccess: () -> Unit,
        onError: () -> Unit
    ) {
        val body = JSONObject()
        body.put("mail", email)
        body.put("password", password)
        body.put("user_type", "volunteer")

        val data = JSONObject()
        data.put("name", user)

        body.put("data", data)

        executor.post(REGISTER_URL, body, { onSuccess() }, onError)
    }

}