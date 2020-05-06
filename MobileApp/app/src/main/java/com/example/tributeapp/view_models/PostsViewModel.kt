package com.example.tributeapp.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.API
import com.example.tributeapp.model.Post

class PostsViewModel(private val api: API): ViewModel() {

    private var liveData: MutableLiveData<List<Post>> = MutableLiveData(emptyList())

    val posts: List<Post>
        get() = liveData.value!!

    fun updatePosts(){
        Log.v(APP_TAG, "Updating Posts!")
        api.getPosts {
            Log.v(APP_TAG, "Success!")
            liveData.value = it
        }
    }

    fun observe(owner: LifecycleOwner, observer: (List<Post>) -> Unit){
        liveData.observe(owner, Observer{
            observer(it)
        })
    }

}