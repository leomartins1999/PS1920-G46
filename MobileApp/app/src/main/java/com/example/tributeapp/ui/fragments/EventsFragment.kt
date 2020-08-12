package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.R
import com.example.tributeapp.ui.view_model_factories.EventsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.EventsViewModel
import com.example.tributeapp.ui.adapters.EventsListAdapter
import com.example.tributeapp.ui.makeToast
import kotlinx.android.synthetic.main.fragment_events.view.*

class EventsFragment: Fragment(){

    private val adapter by lazy {
        EventsListAdapter(model)
    }

    private val model by lazy {
        EventsViewModelProviderFactory().create(EventsViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_events, container, false)

        val recyclerView = root.events_recycler_view
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        model.updateEvents { makeToast(requireContext(), "Error retrieving events!") }

        return root
    }

}