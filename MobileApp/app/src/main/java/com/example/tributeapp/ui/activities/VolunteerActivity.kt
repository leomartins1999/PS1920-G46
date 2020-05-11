package com.example.tributeapp.ui.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.model.dtos.Volunteer
import kotlinx.android.synthetic.main.activity_volunteer.*

const val VOLUNTEER_KEY = "VOLUNTEER"

class VolunteerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_volunteer)

       App.cacheService.getVolunteer(intent.getStringExtra(VOLUNTEER_KEY)!!){
           updateFields(it)
           updateImage(it)
           println(it)
       }
    }

    private fun updateImage(volunteer: Volunteer) {
        Utils.loadImage(this, image, volunteer.imageLink, R.drawable.ic_volunteer_gray)
    }

    private fun updateFields(volunteer: Volunteer) {
        name.text = volunteer.name
        linkedin.text = volunteer.linkedInLink
        description.text = volunteer.description
        followingCount.text = "${volunteer.following.size}"
        followersCount.text = "${volunteer.followers.size}"
    }
}
