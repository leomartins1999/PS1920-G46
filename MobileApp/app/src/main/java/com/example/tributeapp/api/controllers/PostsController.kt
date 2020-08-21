package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.EXECUTE_POST
import com.example.tributeapp.api.posts_url
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.likeURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Post
import org.json.JSONObject

class PostsController(private val executor: RequestExecutor) {

    fun getPosts(filter: Boolean, onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        executor.get(posts_url(filter), ListParser(onSuccess) { Post(it) }, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        executor.put(likeURL(postID), onSuccess, onError)
    }

    fun create(description: String, onSuccess: () -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        body.put("body", description)

        executor.post(EXECUTE_POST, body, onSuccess, onError)
    }

}