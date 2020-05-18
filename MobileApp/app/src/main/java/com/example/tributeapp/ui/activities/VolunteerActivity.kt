package com.example.tributeapp.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.image_loader.ImageLoader
import com.example.tributeapp.model.dtos.Volunteer
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.onClickAuthenticatedMessage
import com.example.tributeapp.ui.view_model_factories.VolunteerViewModelProviderFactory
import com.example.tributeapp.ui.view_models.VolunteerViewModel
import kotlinx.android.synthetic.main.activity_org.*
import kotlinx.android.synthetic.main.activity_volunteer.*
import kotlinx.android.synthetic.main.activity_volunteer.description
import kotlinx.android.synthetic.main.activity_volunteer.followButton
import kotlinx.android.synthetic.main.activity_volunteer.followersCount
import kotlinx.android.synthetic.main.activity_volunteer.followingCount
import kotlinx.android.synthetic.main.activity_volunteer.name

const val VOLUNTEER_KEY = "VOLUNTEER"

class VolunteerActivity : AppCompatActivity() {

    val model by lazy {
        VolunteerViewModelProviderFactory(intent.getStringExtra(VOLUNTEER_KEY)!!)
            .create(VolunteerViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_volunteer)

        model.observe(this) {
            setFields(it)
            updateFollowersAndFollowing(it)
            listenButtons()
        }
    }

    private fun listenButtons() {
        if (App.session!!.hasSession){
            followButton.setOnClickListener {
                model.followVolunteer(
                    {
                        makeToast(this, getString(R.string.operation_success))
                        updateFollowersAndFollowing(model.volunteer)
                        updateButtonText()
                    },
                    {
                        makeToast(this, getString(R.string.operation_error))
                    })
            }

            updateButtonText()
        }
        else
            followButton.setOnClickListener { onClickAuthenticatedMessage(it) }
    }

    private fun updateFollowersAndFollowing(volunteer: Volunteer) {
        followingCount.text = "${volunteer.following.size}"
        followersCount.text = "${volunteer.followers.size}"
    }

    private fun updateButtonText(){
        followButton.text = getString(
            if (model.volunteer.followers.none { it.id == App.session!!.user.id }) R.string.follow_button
            else R.string.unfollow_button
        )
    }

    private fun setFields(volunteer: Volunteer) {
        ImageLoader.loadImage(this, image, volunteer.imageLink, false, R.drawable.ic_volunteer_gray)
        name.text = volunteer.name
        linkedin.text = volunteer.linkedInLink
        description.text = volunteer.description
    }
}
