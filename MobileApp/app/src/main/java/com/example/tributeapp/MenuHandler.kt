package com.example.tributeapp

import android.content.Context
import android.content.Intent
import android.view.Menu
import android.view.MenuInflater
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.core.content.ContextCompat.startActivity
import com.example.tributeapp.activities.*
import java.util.*

class MenuHandler{

    fun inflateMenu(menuInflater: MenuInflater, menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    fun menuListener(context: Context, toolbar: Toolbar) {
        toolbar.setOnMenuItemClickListener{

            val activity = when(it.title.toString().toLowerCase(Locale.ROOT)){
                "posts" -> MainActivity::class.java
                "events" -> EventsActivity::class.java
                "volunteers" -> VolunteersActivity::class.java
                else -> OrgsActivity::class.java
            }

            Toast.makeText(context, "Changing to ${activity.canonicalName}", Toast.LENGTH_SHORT).show()
            startActivity(context, Intent(context, activity), null)

            true
        }
    }

}