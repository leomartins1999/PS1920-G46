package com.example.tributeapp.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.R
import com.example.tributeapp.ui.activities.ORG_KEY
import com.example.tributeapp.ui.activities.OrgActivity
import com.example.tributeapp.ui.adapters.EntityListAdapter
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.view_model_factories.OrgsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.OrgsViewModel
import kotlinx.android.synthetic.main.fragment_orgs.*
import kotlinx.android.synthetic.main.fragment_orgs.view.*

class OrgsFragment : Fragment() {

    private val adapter by lazy {
        EntityListAdapter(model) {
            val intent = Intent(context, OrgActivity::class.java)
            intent.putExtra(ORG_KEY, it)
            startActivity(intent)
        }
    }

    private val model by lazy {
        OrgsViewModelProviderFactory().create(OrgsViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_orgs, container, false)

        val recyclerView = root.orgs_recycler_view
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        model.observe(this) {
            adapter.notifyDataSetChanged()
        }

        root.search_bar.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextChange(newText: String?) = true

            override fun onQueryTextSubmit(query: String?) = model.searchOrg(query)
        })

        root.search_bar.setOnCloseListener {
            Log.v(APP_TAG, "closed search bar")
            model.searchOrg("")
        }

        return root
    }

    override fun onResume() {
        super.onResume()

        model.updateOrgs { makeToast(requireContext(), "Error retrieving orgs!") }
    }


}