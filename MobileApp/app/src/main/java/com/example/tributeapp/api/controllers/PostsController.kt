package com.example.tributeapp.api.controllers

import android.util.Log
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.POSTS_URL
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.likeURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Post
import org.json.JSONObject

class PostsController(private val executor: RequestExecutor) {

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        executor.get(POSTS_URL, ListParser(onSuccess) { Post(it) }, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        executor.put(likeURL(postID), onSuccess, onError)
    }

    fun create(post: Post, onSuccess: () -> Unit, onError: () -> Unit) {
        throw NotImplementedError()
    }

}