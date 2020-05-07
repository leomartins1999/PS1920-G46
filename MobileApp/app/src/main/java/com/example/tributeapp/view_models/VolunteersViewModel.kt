package com.example.tributeapp.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.API
import com.example.tributeapp.model.Volunteer

class VolunteersViewModel(private val api: API) : ViewModel(){

    private var liveData: MutableLiveData<List<Volunteer>> = MutableLiveData(listOf())

    val volunteers: List<Volunteer>
        get() = liveData.value!!

    fun updateVolunteers(){
        Log.v(APP_TAG, "Updating volunteers")
        api.getVolunteers {
            Log.v(APP_TAG, "Success")
            liveData.value = it
        }
    }

    fun observe(owner: LifecycleOwner, observer: (List<Volunteer>) -> Unit){
        liveData.observe(owner, Observer{
            observer(it)
        })
    }

}