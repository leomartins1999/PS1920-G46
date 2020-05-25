package com.example.tributeapp.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.R
import com.example.tributeapp.ui.activities.ORG_KEY
import com.example.tributeapp.ui.view_model_factories.OrgsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.OrgsViewModel
import com.example.tributeapp.ui.adapters.EntityListAdapter
import com.example.tributeapp.ui.activities.OrgActivity
import com.example.tributeapp.ui.makeToast
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

        return root
    }

    override fun onStart() {
        super.onStart()

        model.updateOrgs { makeToast(context, "Error retrieving orgs!") }
    }

}