package com.example.tributeapp.api.controllers

import android.util.Base64
import com.example.tributeapp.api.*
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Post
import org.json.JSONObject

class PostsController(private val executor: RequestExecutor) {

    fun getPosts(filter: Boolean, onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        executor.get(postsUrl(filter), ListParser(onSuccess) { Post(it) }, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        executor.put(likeURL(postID), onSuccess, onError)
    }

    fun create(description: String, onSuccess: (String) -> Unit, onError: () -> Unit) {
        val body = JSONObject()
        body.put("body", description)

        executor.post(EXECUTE_POST, body, { onSuccess(it.getString("id")) }, onError)
    }

    fun updatePostImage(postId: String, imageContent: ByteArray, onSuccess: () -> Unit) {
        val body = JSONObject()
        body.put("data", Base64.encodeToString(imageContent, Base64.DEFAULT))
        executor.put(postImage(postId), onSuccess, {}, body)
    }

}