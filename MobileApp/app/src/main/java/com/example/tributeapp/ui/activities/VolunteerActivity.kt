package com.example.tributeapp.ui.activities

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.image_loader.ImageLoader
import com.example.tributeapp.model.dtos.Volunteer
import com.example.tributeapp.ui.fragments.EditVolunteerFragment
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.renderClickableIcon
import com.example.tributeapp.ui.renderTextView
import com.example.tributeapp.ui.view_model_factories.VolunteerViewModelProviderFactory
import com.example.tributeapp.ui.view_models.VolunteerViewModel
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
            listenButtons(it)
        }
    }

    override fun onResume() {
        super.onResume()
        model.updateVolunteer()
    }

    private fun listenButtons(volunteer: Volunteer) {
        if (App.session!!.hasSession) {
            if (App.session!!.volunteer == volunteer) {
                /**
                 * on click, open edit dialog ...
                 */
                editButton.setOnClickListener {
                    val editFragment = EditVolunteerFragment(volunteer.description, volunteer.linkedInLink) {model.updateVolunteer()}
                    editFragment.show(supportFragmentManager, "editVolunteer")
                }

                editButton.visibility = View.VISIBLE
            } else {
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
                followButton.visibility = View.VISIBLE
            }
        }
    }

    private fun updateFollowersAndFollowing(volunteer: Volunteer) {
        followingCount.text = "${volunteer.following.size}"
        followersCount.text = "${volunteer.followers.size}"
    }

    private fun updateButtonText() {
        followButton.text = getString(
            if (model.volunteer.followers.none { it.id == App.session!!.user.id }) R.string.follow_button
            else R.string.unfollow_button
        )
    }

    private fun setFields(volunteer: Volunteer) {
        ImageLoader.loadImage(this, image, volunteer.imageLink, false, R.drawable.ic_volunteer_gray, App.session!!.hasSession && App.session!!.user.id == volunteer.id)
        name.text = volunteer.name
        //renderClickableIcon("http://", volunteer.linkedInLink, li_icon, this)
        renderTextView(volunteer.description, description)
    }
}
