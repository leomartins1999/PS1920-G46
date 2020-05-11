package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.POSTS_URL
import com.example.tributeapp.api.RequestExecutor
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.model.dtos.Post

class PostsController(private val executor: RequestExecutor) {

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        executor.get(POSTS_URL, ListParser(onSuccess) { Post(it) }, onError)

}