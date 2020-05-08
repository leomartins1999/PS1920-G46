package com.example.tributeapp.activities.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.model.dtos.Volunteer
import kotlinx.android.synthetic.main.activity_volunteer.*
import org.json.JSONObject

const val VOLUNTEER_ID_KEY = "VOLUNTEER"

class VolunteerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_volunteer)

       App.cacheService.getVolunteer(intent.getStringExtra(VOLUNTEER_ID_KEY)!!){
           updateFields(it)
           println(it)
       }
    }

    private fun updateFields(volunteer: Volunteer) {
        name.text = volunteer.name
        linkedin.text = volunteer.linkedInLink
        description.text = volunteer.description
        followingCount.text = "${volunteer.following.size}"
        followersCount.text = "${volunteer.followers.size}"
    }
}
