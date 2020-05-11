package com.example.tributeapp.activities.activities

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.activities.activities.BaseActivity
import com.example.tributeapp.activities.view_model_factories.EventsViewModelProviderFactory
import com.example.tributeapp.activities.view_models.EventsViewModel
import com.example.tributeapp.model.adapters.EventsListAdapter

class EventsActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Events"

    private val adapter: EventsListAdapter by lazy {
        EventsListAdapter(model)
    }

    private val model: EventsViewModel by lazy{
        EventsViewModelProviderFactory().create(EventsViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_events)

        val recyclerView = findViewById<RecyclerView>(R.id.events)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        model.updateEvents { Toast.makeText(this, "Error fetching events!", Toast.LENGTH_SHORT).show() }
    }
}
