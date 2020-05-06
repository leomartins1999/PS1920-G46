package com.example.tributeapp.activities

import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.R

class MainActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Posts"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState, R.layout.activity_main)
    }
}
