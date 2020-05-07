package com.example.tributeapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.R
import com.example.tributeapp.model.Volunteer
import org.json.JSONObject

class VolunteerActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_volunteer)

        val obj = JSONObject("{\"_id\":\"5e960b0725a53a0e787804ef\",\"name\":\"monkaW\",\"description\":\"description\",\"linkedInLink\":\"www.linkedin.com\",\"imageLink\":\"link to image\",\"following\":{\"5e97280520fef920f4120a12\":\"volunteer\",\"5e960b1925a53a0e787804f0\":\"org\",\"5e960b0725a53a0e787804ef\":\"volunteer\"},\"followers\":{\"5e960b0725a53a0e787804ef\":\"volunteer\",\"5e972ca23b8a6918d84c9183\":\"org\"}}")
        val volunteer = Volunteer(obj)

        println(volunteer)
    }
}
