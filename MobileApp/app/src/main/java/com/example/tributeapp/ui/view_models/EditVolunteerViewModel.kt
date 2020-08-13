package com.example.tributeapp.ui.view_models

import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService

class EditVolunteerViewModel(private val api: APIService) : ViewModel(){

    fun updateVolunteer(description: String?, linkedinLink: String?, onSuccess: () -> Unit, onError: () -> Unit){
        api.updateVolunteer(App.session!!.volunteer.id, description, linkedinLink, onSuccess, onError)
    }

    fun updateVolunteerImg(imageContent: ByteArray, onSuccess: () -> Unit, onError: () -> Unit) {
        api.updateVolunteerImg(App.session!!.volunteer.id, imageContent, onSuccess, onError)
    }

}