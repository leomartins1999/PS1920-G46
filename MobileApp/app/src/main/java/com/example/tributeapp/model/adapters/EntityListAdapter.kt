package com.example.tributeapp.model.adapters

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.activities.activities.VOLUNTEER_ID_KEY
import com.example.tributeapp.activities.activities.VolunteerActivity
import com.example.tributeapp.activities.view_models.EntityViewModel
import com.example.tributeapp.model.dtos.Entity
import com.example.tributeapp.model.dtos.Volunteer

class EntityListAdapter(private val model: EntityViewModel)
    : RecyclerView.Adapter<EntityViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EntityViewHolder {
        val volunteersView = LayoutInflater.from(parent.context)
            .inflate(R.layout.volunteer_list_element, parent, false) as LinearLayout
        return EntityViewHolder(volunteersView)
    }

    override fun getItemCount(): Int {
        return model.model.size
    }

    override fun onBindViewHolder(holder: EntityViewHolder, position: Int) {
        holder.bindTo(model.model[position])
    }

}

class EntityViewHolder(private val entityLayout: LinearLayout)
    : RecyclerView.ViewHolder(entityLayout){

    private val image = entityLayout.findViewById<ImageView>(R.id.image)
    private val name = entityLayout.findViewById<TextView>(R.id.name)
    private val followers = entityLayout.findViewById<TextView>(R.id.followers_count)

    fun bindTo(entity: Entity){
        Utils.loadImage(entityLayout.context, image, entity.imageLink, R.drawable.ic_volunteer_gray)

        name.text = entity.name

        followers.text = "${entity.followers.size}"

        entityLayout.setOnClickListener{
            val intent = Intent(entityLayout.context, VolunteerActivity::class.java)
            intent.putExtra(VOLUNTEER_ID_KEY, entity.id)
            entityLayout.context.startActivity(intent)
        }
    }

}