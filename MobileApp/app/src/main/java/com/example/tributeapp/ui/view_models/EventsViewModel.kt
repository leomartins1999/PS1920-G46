package com.example.tributeapp.ui.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Event

class EventsViewModel(private val api: APIService): ViewModel(){

    private val liveData: MutableLiveData<List<Event>> = MutableLiveData(listOf())

    val events: List<Event>
        get() = liveData.value!!

    fun updateEvents(onError: () -> Unit){
        Log.v(APP_TAG,"Update events - call")
        api.getEvents({
            Log.v(APP_TAG,"Update events - success")
            liveData.value = it
        },{
            onError()
        })
    }

    fun observe(owner: LifecycleOwner, observer: (List<Event>) -> Unit) {
        liveData.observe(owner, Observer {
            observer(it)
        })
    }

}