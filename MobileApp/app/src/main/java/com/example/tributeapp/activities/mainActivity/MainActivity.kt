package com.example.tributeapp.activities.mainActivity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.tributeapp.R

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setSupportActionBar(findViewById(R.id.topAppBar))
    }
}
