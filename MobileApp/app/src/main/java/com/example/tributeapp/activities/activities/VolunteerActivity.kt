package com.example.tributeapp.activities.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.R
import com.example.tributeapp.model.dtos.Volunteer
import kotlinx.android.synthetic.main.activity_volunteer.*
import org.json.JSONObject

class VolunteerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_volunteer)

        // TODO: get volunteer from intent
        val obj = JSONObject("{\"_id\":\"5e960b0725a53a0e787804ef\",\"name\":\"monkaW\",\"description\":\"twitch emote with the funny frog\",\"linkedInLink\":\"www.linkedin.com\",\"imageLink\":\"link to image\",\"following\":{\"5e97280520fef920f4120a12\":\"volunteer\",\"5e960b1925a53a0e787804f0\":\"org\",\"5e960b0725a53a0e787804ef\":\"volunteer\"},\"followers\":{\"5e960b0725a53a0e787804ef\":\"volunteer\",\"5e972ca23b8a6918d84c9183\":\"org\"}}")
        val volunteer = Volunteer(obj)

        updateFields(volunteer)


        println(volunteer)
    }

    private fun updateFields(volunteer: Volunteer) {
        name.text = volunteer.name
        linkedin.text = volunteer.linkedInLink
        description.text = volunteer.description
        followingCount.text = "${volunteer.following.size}"
        followersCount.text = "${volunteer.followers.size}"
    }
}
