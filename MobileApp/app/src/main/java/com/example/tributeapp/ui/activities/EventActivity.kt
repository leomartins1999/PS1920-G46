package com.example.tributeapp.ui.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.format.DateFormat
import android.view.View
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.image_loader.ImageLoader
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.onClickAuthenticatedMessage
import com.example.tributeapp.ui.renderTextView
import com.example.tributeapp.ui.view_model_factories.EventViewModelProviderFactory
import com.example.tributeapp.ui.view_models.EventViewModel
import kotlinx.android.synthetic.main.activity_event.*

const val EVENT_KEY = "EVENT"

class EventActivity : AppCompatActivity() {

    val model: EventViewModel by lazy {
        EventViewModelProviderFactory(intent).create(EventViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_event)

        setOrgFields()
        setEventFields()

        updateInterestedAndParticipants()

        listenButtons()
    }

    private fun setOrgFields() {
        val event = model.event

        App.cacheService.getOrg(event.owner_id) { org ->
            ImageLoader.loadImage(this, image, org.imageLink, false, R.drawable.ic_volunteer_gray)
            org_name.text = org.name
            org_header.setOnClickListener {
                startActivity(Intent(this, OrgActivity::class.java).putExtra(ORG_KEY, org.id))
            }
        }
    }

    private fun setEventFields() {
        val event = model.event

        event_name.text = event.name
        ImageLoader.loadImage(this, event_image, event.imageLink, true)

        if (event.location.isNullOrEmpty() || event.location == "null") location_layout.visibility =
            View.GONE
        else location.text = event.location

        if (event.date.time == 0L) date_layout.visibility = View.GONE
        else date.text = event.getDateString()

        renderTextView(event.description, description)
    }

    private fun updateInterestedAndParticipants() {
        val event = model.event

        interested.text = "${event.interested.size}"
    }

    private fun listenButtons() {
        if (!App.session!!.hasSession)
            interested_button.setOnClickListener { onClickAuthenticatedMessage(it) }
        else {
            interested_button.setOnClickListener {
                model.interested({
                    updateButtonText()
                    updateInterestedAndParticipants()
                    makeToast(this, getString(R.string.updated_interest))
                }, { makeToast(this, getString(R.string.error_performing_action)) })
            }

            updateButtonText()
        }
    }

    private fun updateButtonText() {
        interested_button.text = getString(
            if (model.event.interested.none { it.id == App.session!!.user.id }) R.string.interested_button
            else R.string.not_interested_button
        )
    }

}
