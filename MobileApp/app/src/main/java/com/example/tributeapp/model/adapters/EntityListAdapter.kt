package com.example.tributeapp.model.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.ui.view_models.EntityViewModel
import com.example.tributeapp.model.dtos.Entity

class EntityListAdapter(private val model: EntityViewModel, private val onClick: (String) -> Unit)
    : RecyclerView.Adapter<EntityViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EntityViewHolder {
        val entityView = LayoutInflater.from(parent.context)
            .inflate(R.layout.entity_list_element, parent, false) as LinearLayout
        return EntityViewHolder(entityView, onClick)
    }

    override fun getItemCount(): Int {
        return model.model.size
    }

    override fun onBindViewHolder(holder: EntityViewHolder, position: Int) {
        holder.bindTo(model.model[position])
    }

}

class EntityViewHolder(private val entityLayout: LinearLayout, private val onClick: (String) -> Unit)
    : RecyclerView.ViewHolder(entityLayout){

    private val image = entityLayout.findViewById<ImageView>(R.id.image)
    private val name = entityLayout.findViewById<TextView>(R.id.name)
    private val followers = entityLayout.findViewById<TextView>(R.id.followers_count)

    fun bindTo(entity: Entity){
        Utils.loadImage(entityLayout.context, image, entity.imageLink, R.drawable.ic_volunteer_gray)

        name.text = entity.name

        followers.text = "${entity.followers.size}"

        entityLayout.setOnClickListener{onClick(entity.id)}
    }

}