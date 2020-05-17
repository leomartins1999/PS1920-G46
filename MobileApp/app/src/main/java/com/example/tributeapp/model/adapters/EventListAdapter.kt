package com.example.tributeapp.model.adapters

import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
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

    private val owner_pic = layout.findViewById<ImageView>(R.id.owner_pic)
    private val owner_name = layout.findViewById<TextView>(R.id.owner_name)

    private val name = layout.findViewById<TextView>(R.id.name)
    private val date = layout.findViewById<TextView>(R.id.date)

    private val participants = layout.findViewById<TextView>(R.id.participants_info)

    fun bindTo(event: Event){
        App.cacheService.getOrg(event.org_id){
            Utils.loadImage(layout.context, owner_pic, it.imageLink)
            owner_name.text = it.name
        }

        name.text = event.name
        date.text = event.date

        participants.text = layout.context.getString(R.string.event_interested_and_participants, event.interested.size, event.participants.size)

        layout.setOnClickListener{
            val intent = Intent(layout.context, EventActivity::class.java)
            intent.putExtra(EVENT_KEY, event)
            layout.context.startActivity(intent)
        }
    }
}