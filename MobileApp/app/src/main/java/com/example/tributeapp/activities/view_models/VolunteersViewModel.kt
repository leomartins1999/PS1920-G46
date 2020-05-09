package com.example.tributeapp.activities.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Volunteer

class VolunteersViewModel(private val api: APIService) : EntityViewModel(){

    private var liveData: MutableLiveData<List<Volunteer>> = MutableLiveData(listOf())

    override val model: List<Volunteer>
        get() = liveData.value!!

    fun updateVolunteers(onError: () -> Unit){
        Log.v(APP_TAG, "Updating volunteers")
        api.getVolunteers({
            Log.v(APP_TAG, "Success")
            liveData.value = it
        }, onError)
    }

    fun observe(owner: LifecycleOwner, observer: (List<Volunteer>) -> Unit){
        liveData.observe(owner, Observer{
            observer(it)
        })
    }

}