package com.example.tributeapp.ui.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.model.adapters.EntityListAdapter
import com.example.tributeapp.ui.view_model_factories.VolunteersViewModelProviderFactory
import com.example.tributeapp.ui.view_models.VolunteersViewModel

class VolunteersActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Volunteers"

    private val adapter: EntityListAdapter by lazy {
        EntityListAdapter(model){
            val intent = Intent(this, VolunteerActivity::class.java)
            intent.putExtra(VOLUNTEER_KEY, it)
            startActivity(intent)
        }
    }

    private val model: VolunteersViewModel by lazy {
        VolunteersViewModelProviderFactory().create(VolunteersViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_volunteers)

        val recyclerView = findViewById<RecyclerView>(R.id.volunteers_recycler_view)
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
