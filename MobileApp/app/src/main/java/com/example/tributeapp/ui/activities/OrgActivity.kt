package com.example.tributeapp.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.image_loader.ImageLoader
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.onClickAuthenticatedMessage
import com.example.tributeapp.ui.renderClickableIcon
import com.example.tributeapp.ui.renderTextView
import com.example.tributeapp.ui.view_model_factories.OrgViewModelProviderFactory
import com.example.tributeapp.ui.view_models.OrgViewModel
import kotlinx.android.synthetic.main.activity_org.*
import kotlinx.android.synthetic.main.activity_org.description

const val ORG_KEY = "ORG"

class OrgActivity : AppCompatActivity() {

    val model by lazy {
        OrgViewModelProviderFactory(intent.getStringExtra(ORG_KEY)!!).create(OrgViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_org)

        model.observe(this) {
            setFields(it)
            updateImage(it)
            updateFollowers(it)
        }

        listenButtons()
    }

    private fun setFields(org: Org) {
        name.text = org.name

        renderClickableIcon("http://", org.siteLink, website_icon, this)
        renderClickableIcon("tel:", org.phone, phone_icon, this)
        renderClickableIcon("mailto:", org.mail, mail_icon, this)
        renderClickableIcon("http://", org.facebookLink, fb_icon, this)

        renderTextView(org.description, description)
    }

    private fun updateImage(org: Org) {
        ImageLoader.loadImage(this, org_image, org.imageLink, false, R.drawable.ic_volunteer_gray)
    }

    private fun updateFollowers(org: Org) {
        followingCount.text = "${org.following.size}"
        followersCount.text = "${org.followers.size}"
    }

    private fun listenButtons() {
        if (App.session!!.hasSession) {
            followButton.setOnClickListener {
                model.followOrg(
                    {
                        updateFollowers(model.org)
                        updateButtonText()
                        makeToast(this, getString(R.string.operation_success))
                    },
                    { makeToast(this, getString(R.string.operation_error)) }
                )
            }

            updateButtonText()
        } else followButton.setOnClickListener { onClickAuthenticatedMessage(it) }
    }

    private fun updateButtonText() {
        followButton.text = getString(
            if (model.org.followers.none { it.id == App.session!!.user.id }) R.string.follow_button
            else R.string.unfollow_button
        )
    }
}
