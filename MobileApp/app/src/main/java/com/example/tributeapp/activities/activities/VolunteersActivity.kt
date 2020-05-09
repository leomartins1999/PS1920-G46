package com.example.tributeapp.activities.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.model.adapters.VolunteersListAdapter
import com.example.tributeapp.activities.view_model_factories.VolunteersViewModelProviderFactory
import com.example.tributeapp.activities.view_models.VolunteersViewModel

class VolunteersActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Volunteers"

    private val adapter: VolunteersListAdapter by lazy {
        VolunteersListAdapter(model)
    }

    private val model: VolunteersViewModel by lazy {
        VolunteersViewModelProviderFactory().create(VolunteersViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_volunteers)

        val recyclerView = findViewById<RecyclerView>(R.id.volunteers)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        updateVolunteers()
    }

    private fun updateVolunteers(){
        model.updateVolunteers{ Toast.makeText(this, "Error while retrieving volunteers.", Toast.LENGTH_SHORT).show()}
    }
}
