package com.example.tributeapp.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.ui.UIUtils
import com.example.tributeapp.ui.activities.VOLUNTEER_KEY
import com.example.tributeapp.ui.activities.VolunteerActivity
import com.example.tributeapp.ui.view_model_factories.VolunteersViewModelProviderFactory
import com.example.tributeapp.ui.view_models.VolunteersViewModel
import com.example.tributeapp.model.adapters.EntityListAdapter

class VolunteersFragment: Fragment(){

    private val adapter: EntityListAdapter by lazy {
        EntityListAdapter(model){
            val intent = Intent(context, VolunteerActivity::class.java)
            intent.putExtra(VOLUNTEER_KEY, it)
            startActivity(intent)
        }
    }

    private val model: VolunteersViewModel by lazy {
        VolunteersViewModelProviderFactory().create(VolunteersViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_volunteers, container, false)

        val recyclerView = root.findViewById<RecyclerView>(R.id.volunteers_recycler_view)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        model.updateVolunteers { UIUtils.makeToast(context, "Error loading volunteers!") }

        return root
    }

}