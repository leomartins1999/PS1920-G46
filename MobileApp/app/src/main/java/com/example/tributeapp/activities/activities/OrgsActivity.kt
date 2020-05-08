package com.example.tributeapp.activities.activities

import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.R
import com.example.tributeapp.activities.activities.BaseActivity

class OrgsActivity: BaseActivity(){

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Orgs"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_orgs)
    }

}
