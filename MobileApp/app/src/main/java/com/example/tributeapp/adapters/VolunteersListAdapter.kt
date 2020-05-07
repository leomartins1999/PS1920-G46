package com.example.tributeapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.LinearLayout
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.model.Volunteer
import com.example.tributeapp.view_models.VolunteersViewModel

class VolunteersListAdapter(private val model: VolunteersViewModel)
    : RecyclerView.Adapter<VolunteersViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VolunteersViewHolder {
        val volunteersView = LayoutInflater.from(parent.context)
            .inflate(R.layout.volunteer_list_element, parent, false) as LinearLayout
        return VolunteersViewHolder(volunteersView)
    }

    override fun getItemCount(): Int {
        return model.volunteers.size
    }

    override fun onBindViewHolder(holder: VolunteersViewHolder, position: Int) {
        holder.bindTo(model.volunteers[position])
    }

}

class VolunteersViewHolder(volunteersView: LinearLayout)
    : RecyclerView.ViewHolder(volunteersView){

    fun bindTo(volunteer: Volunteer){

    }

}