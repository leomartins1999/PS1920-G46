package com.example.tributeapp.activities.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.R

const val EVENT_KEY = "EVENT"
class EventActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_event)

        val event = intent.getSerializableExtra(EVENT_KEY)
    }
}
