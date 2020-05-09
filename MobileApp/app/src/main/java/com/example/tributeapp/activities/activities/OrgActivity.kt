package com.example.tributeapp.activities.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.model.dtos.Org
import kotlinx.android.synthetic.main.activity_org.*
import org.json.JSONObject

const val ORG_ID_KEY = "ORGANIZATION"

class OrgActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_org)

        val json = "{\"_id\":\"5e960b1925a53a0e787804f0\",\"name\":\"org\",\"description\":\"description\",\"phone\":\"+351 987654321\",\"mail\":null,\"siteLink\":\"www.org.com\",\"facebookLink\":\"www.facebook.com/org\",\"followers\":{\"5e960b0725a53a0e787804ef\":\"volunteer\",\"5e973524c4d2aa06c42dd824\":\"volunteer\"},\"following\":{},\"imageLink\":\"/images/orgs/5e960b1925a53a0e787804f0\"}"
        val org = Org(JSONObject(json))
        updateFields(org)
        updateImage(org)
        println(org)
    }

    private fun updateImage(org: Org) {
        Utils.loadImage(this, image, org.imageLink, R.drawable.ic_volunteer_gray)
    }

    private fun updateFields(org: Org) {
        name.text = org.name
        site.text = org.siteLink
        facebook.text =  org.facebookLink
        mail.text = org.mail
        phone.text = org.phone
        description.text = org.description
        followingCount.text = "${org.following.size}"
        followersCount.text = "${org.followers.size}"
    }
}
