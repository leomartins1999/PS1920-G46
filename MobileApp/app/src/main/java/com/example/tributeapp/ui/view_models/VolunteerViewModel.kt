package com.example.tributeapp.ui.view_models

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Volunteer

class VolunteerViewModel(
    private val volunteerID: String,
    private val volunteerSupplier: (String, (Volunteer) -> Unit) -> Unit,
    private val api: APIService
) : ViewModel(){

    private val liveData = MutableLiveData<Volunteer>()

    val volunteer: Volunteer
        get() = liveData.value!!

    init {
        getVolunteer()
    }

    private fun getVolunteer(){
        volunteerSupplier(volunteerID){
            liveData.value = it
        }
    }

    fun followVolunteer(onSuccess: () -> Unit, onError: () -> Unit){
        api.followVolunteer(
            volunteerID,
            {
                when(val idx = volunteer.followers.indexOfFirst { it.id == App.session!!.user.id }){
                    -1 -> volunteer.followers.add(App.session!!.user)
                    else -> volunteer.followers.removeAt(idx)
                }
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