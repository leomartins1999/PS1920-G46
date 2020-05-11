package com.example.tributeapp.ui.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Post

class PostsViewModel(private val api: APIService) : ViewModel() {

    private var liveData: MutableLiveData<List<Post>> = MutableLiveData(emptyList())

    val posts: List<Post>
        get() = liveData.value!!

    fun updatePosts(onError: () -> Unit) {
        Log.v(APP_TAG, "Update posts -> call")
        api.getPosts({
            Log.v(APP_TAG, "Update posts -> success $it")
            liveData.value = it
        }, onError)
    }

    fun likePost(userID: String, postID: String, onSuccess: () -> Unit, onError: () -> Unit) {
        Log.v(APP_TAG, "Like post -> call - userID: $userID, postID: $postID")
        api.likePost(postID, {
            Log.v(APP_TAG, "Like post -> success")
            onSuccess()
        }, onError)
    }

    fun observe(owner: LifecycleOwner, observer: (List<Post>) -> Unit) {
        liveData.observe(owner, Observer {
            observer(it)
        })
    }

}