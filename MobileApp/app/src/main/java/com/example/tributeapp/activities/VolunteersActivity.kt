package com.example.tributeapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.R

class VolunteersActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Volunteers"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState, R.layout.activity_volunteers)
    }
}
