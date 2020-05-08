package com.example.tributeapp.model.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.tributeapp.R
import com.example.tributeapp.model.dtos.Volunteer
import com.example.tributeapp.activities.view_models.VolunteersViewModel

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

class VolunteersViewHolder(private val volunteersView: LinearLayout)
    : RecyclerView.ViewHolder(volunteersView){

    private val image = volunteersView.findViewById<ImageView>(R.id.image)
    private val name = volunteersView.findViewById<TextView>(R.id.name)

    fun bindTo(volunteer: Volunteer){
        Glide
            .with(volunteersView.context)
            .applyDefaultRequestOptions(
                RequestOptions()
                    .placeholder(R.drawable.ic_error_image)
                    .error(R.drawable.ic_error_image)
            )
            .load(volunteer.imageLink)
            .into(image)

        name.text = volunteer.name
    }

}