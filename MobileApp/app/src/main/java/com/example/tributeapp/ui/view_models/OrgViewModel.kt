package com.example.tributeapp.ui.view_models

import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import com.example.tributeapp.App
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.model.dtos.updateUser

class OrgViewModel(
    private val orgID: String,
    private val supplier: (String, (Org) -> Unit) -> Unit,
    private val api: APIService
) : ViewModel() {

    private val liveData = MutableLiveData<Org>()

    val org: Org
        get() = liveData.value!!

    init {
        updateOrg()
    }

    private fun updateOrg() {
        supplier(orgID) {
            liveData.value = it
        }
    }

    fun followOrg(onSuccess: () -> Unit, onError: () -> Unit) {
        api.followOrg(
            orgID,
            {
                org.followers.updateUser(App.session!!.user)
                onSuccess()
            }, onError
        )
    }

    fun observe(owner: LifecycleOwner, observer: (Org) -> Unit) {
        liveData.observe(owner, Observer {
            observer(it)
        })
    }

}