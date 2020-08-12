package com.example.tributeapp.ui.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Volunteer
import com.example.tributeapp.model.dtos.updateUser

class VolunteerViewModel(
    private val volunteerID: String,
    private val supplier: (String, (Volunteer) -> Unit) -> Unit,
    private val api: APIService
) : ViewModel(){

    private val liveData = MutableLiveData<Volunteer>()

    val volunteer: Volunteer
        get() = liveData.value!!

    init {
        getVolunteer()
    }

    private fun getVolunteer(){
        supplier(volunteerID){
            liveData.value = it
        }
    }

    fun updateVolunteer(){
        api.getVolunteer(volunteerID, {getVolunteer()}, { Log.v(APP_TAG, "Couldn't update volunteer")})
    }

    fun followVolunteer(onSuccess: () -> Unit, onError: () -> Unit){
        api.followVolunteer(
            volunteerID,
            {
                volunteer.followers.updateUser(App.session!!.user)
                onSuccess()
            },
            onError
        )
    }

    fun observe(owner: LifecycleOwner, observer: (Volunteer) -> Unit){
        liveData.observe(owner, Observer{
            observer(it)
        })
    }

}