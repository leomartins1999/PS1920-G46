package com.example.tributeapp.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.model.dtos.Event
import kotlinx.android.synthetic.main.activity_event.*

const val EVENT_KEY = "EVENT"

class EventActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_event)

        val event = intent.getParcelableExtra<Event>(EVENT_KEY)!!

        updateOrgFields(event)
        updateEventFields(event)
    }

    private fun updateOrgFields(event: Event) {
        App.cacheService.getOrg(event.org_id) {
            Utils.loadImage(this, OrgImage, it.imageLink)
            OrgName.text = it.name
        }
    }

    private fun updateEventFields(event: Event) {
        Utils.loadImage(this, EventImage, event.imageLink)
        location.text = event.location
        date.text = event.date
        interested.text = "${event.interested.size}"
        participating.text = "${event.interested.size}"
        description.text = event.description
    }
}
