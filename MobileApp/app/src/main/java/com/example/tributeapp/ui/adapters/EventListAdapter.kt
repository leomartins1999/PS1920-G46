package com.example.tributeapp.ui.adapters

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.image_loader.ImageLoader
import com.example.tributeapp.ui.activities.EVENT_KEY
import com.example.tributeapp.ui.activities.EventActivity
import com.example.tributeapp.ui.view_models.EventsViewModel
import com.example.tributeapp.model.dtos.Event

class EventsListAdapter(
    private val model: EventsViewModel
) : RecyclerView.Adapter<EventsViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): EventsViewHolder {
        val postsView = LayoutInflater.from(parent.context)
            .inflate(R.layout.event_list_element, parent, false) as LinearLayout
        return EventsViewHolder(postsView)
    }

    override fun getItemCount(): Int {
        return model.events.size
    }

    override fun onBindViewHolder(holder: EventsViewHolder, position: Int) {
        holder.bindTo(model.events[position])
    }
}

class EventsViewHolder(private val layout: LinearLayout)
    :RecyclerView.ViewHolder(layout){

    private val ownerPic = layout.findViewById<ImageView>(R.id.owner_pic)
    private val ownerName = layout.findViewById<TextView>(R.id.owner_name)

    private val name = layout.findViewById<TextView>(R.id.name)
    private val date = layout.findViewById<TextView>(R.id.date)

    private val participants = layout.findViewById<TextView>(R.id.participants_info)

    fun bindTo(event: Event){
        App.cacheService.getOrg(event.owner_id){
            ImageLoader.loadImage(layout.context, ownerPic, it.imageLink, false, R.drawable.ic_volunteer_gray)
            ownerName.text = it.name
        }

        name.text = event.name
        date.text = event.getDateString()

        participants.text = layout.context.getString(R.string.event_interested, event.nrInterested)

        layout.setOnClickListener{
            val intent = Intent(layout.context, EventActivity::class.java)
            intent.putExtra(EVENT_KEY, event)
            layout.context.startActivity(intent)
        }
    }
}