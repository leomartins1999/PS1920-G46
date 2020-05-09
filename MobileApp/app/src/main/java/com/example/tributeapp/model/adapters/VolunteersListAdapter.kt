package com.example.tributeapp.model.adapters

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.activities.activities.VOLUNTEER_ID_KEY
import com.example.tributeapp.activities.activities.VolunteerActivity
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

class VolunteersViewHolder(private val volunteerView: LinearLayout)
    : RecyclerView.ViewHolder(volunteerView){

    private val image = volunteerView.findViewById<ImageView>(R.id.image)
    private val name = volunteerView.findViewById<TextView>(R.id.name)
    private val followers = volunteerView.findViewById<TextView>(R.id.followers_count)

    fun bindTo(volunteer: Volunteer){
        Utils.loadImage(volunteerView.context, image, volunteer.imageLink, R.drawable.ic_volunteer_gray)

        name.text = volunteer.name

        followers.text = "${volunteer.followers.size}"

        volunteerView.setOnClickListener{
            val intent = Intent(volunteerView.context, VolunteerActivity::class.java)
            intent.putExtra(VOLUNTEER_ID_KEY, volunteer.id)
            volunteerView.context.startActivity(intent)
        }
    }

}