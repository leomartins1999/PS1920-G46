package com.example.tributeapp.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
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

        App.cacheService.getOrg(event.org_id) {
            Utils.loadImage(this, org_image, it.imageLink)
            org_name.text = it.name
        }
    }

    private fun setEventFields() {
        val event = model.event

        event_name.text = event.name
        Utils.loadImage(this, event_image, event.imageLink)
        location.text = event.location
        date.text = event.date
        description.text = event.description
    }

    private fun updateInterestedAndParticipants(){
        val event = model.event

        interested.text = "${event.interested.size}"
        participating.text = "${event.participants.size}"
    }

    private fun listenButtons(){
        if (!App.session!!.hasSession)
            interested_button.setOnClickListener{Utils.onClickAuthenticatedMessage(it)}
        else{
            interested_button.setOnClickListener{
                model.interested({
                    updateButtonText()
                    updateInterestedAndParticipants()
                    Utils.makeToast(this, getString(R.string.updated_interest))
                }, {Utils.makeToast(this, getString(R.string.error_performing_action))})
            }

            updateButtonText()
        }
    }

    private fun updateButtonText(){
        interested_button.text = getString(
            if (model.event.interested.none { it.id == App.session!!.user.id }) R.string.interested_button
            else R.string.not_interested_button
        )
    }

}
