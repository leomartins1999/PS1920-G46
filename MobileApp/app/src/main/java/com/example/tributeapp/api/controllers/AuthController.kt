package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.LOGIN_URL
import com.example.tributeapp.api.RequestExecutor
import org.json.JSONObject

class AuthController(private val executor: RequestExecutor){

    fun login(email: String, password: String, onSuccess: () -> Unit, onError: () -> Unit){
        val body = JSONObject()
        body.put("email", email)
        body.put("password", password)

        executor.post(
            LOGIN_URL,
            body,
            {
                onSuccess()
            },
            onError)
    }

}