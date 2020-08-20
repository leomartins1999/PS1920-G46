package com.example.tributeapp.ui.view_models

import android.util.Log
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.api.APIService
import com.example.tributeapp.model.dtos.Org

class OrgsViewModel(private val api: APIService): EntityViewModel(){

    private var liveData: MutableLiveData<List<Org>> = MutableLiveData(listOf())

    override val model: List<Org>
        get() = liveData.value!!

    fun updateOrgs(onError: () -> Unit){
        Log.v(APP_TAG, "Updating orgs")
        api.getOrgs(searchQuery, {
            Log.v(APP_TAG, "Success")
            liveData.value = it
        }, onError)
    }

    fun observe(owner: LifecycleOwner, observer: (List<Org>) -> Unit) {
        liveData.observe(owner, Observer {
            observer(it)
        })
    }

    fun searchOrg(query: String?): Boolean {
        searchQuery = query ?: ""
        updateOrgs {
            Log.v(APP_TAG, "Failed to search for orgs: $query")
        }
        return true
    }

}