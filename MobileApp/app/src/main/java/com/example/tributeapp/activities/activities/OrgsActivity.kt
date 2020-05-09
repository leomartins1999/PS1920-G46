package com.example.tributeapp.activities.activities

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.activities.view_model_factories.OrgsViewModelProviderFactory
import com.example.tributeapp.activities.view_models.OrgsViewModel

class OrgsActivity: BaseActivity(){

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Orgs"

//    private val adapter: OrgsListAdapter by lazy{
//        OrgsListAdapter(model)
//    }

    private val model: OrgsViewModel by lazy {
        OrgsViewModelProviderFactory().create(OrgsViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_orgs)

//        val recyclerView = findViewById<RecyclerView>(R.id.orgs)
//        recyclerView.adapter = adapter
//        recyclerView.layoutManager = LinearLayoutManager(this)
//
//        model.observe(this){
//            adapter.notifyDataSetChanged()
//        }

        updateOrgs()
    }

    private fun updateOrgs(){
        model.updateOrgs{ Toast.makeText(this, "Error while retrieving orgs.", Toast.LENGTH_SHORT).show()}
    }

}
