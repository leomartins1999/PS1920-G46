package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.view_model_factories.EventsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.EventsViewModel
import com.example.tributeapp.ui.adapters.EventsListAdapter
import com.example.tributeapp.ui.makeToast
import kotlinx.android.synthetic.main.fragment_events.view.*
import kotlinx.android.synthetic.main.fragment_posts.view.*

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

        return root
    }

    override fun onResume() {
        super.onResume()
        updateEvents()
        enableRadioButtons()
    }

    private fun updateEvents(){
        model.updateEvents { makeToast(requireContext(), "Error retrieving events!") }
    }

    private fun enableRadioButtons(){
        if (!App.session!!.hasSession) return

        val layout = requireView()

        layout.your_events_radio.visibility = View.VISIBLE

        layout.select_events_group.setOnCheckedChangeListener { _, checkedId ->
            model.updateFilter(checkedId == layout.your_events_radio.id)
            updateEvents()
        }
    }

}