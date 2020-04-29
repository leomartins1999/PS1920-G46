package com.example.tributeapp

import android.content.Context
import android.content.Intent
import android.view.Menu
import android.view.MenuInflater
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.core.content.ContextCompat.startActivity
import com.example.tributeapp.activities.OrgsActivity
import java.util.*

class MenuHandler{

    fun inflateMenu(menuInflater: MenuInflater, menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    fun menuListener(context: Context, toolbar: Toolbar) {
        toolbar.setOnMenuItemClickListener{
            when(it.title.toString().toLowerCase(Locale.ROOT)){
                "posts",
                "events",
                "volunteers" -> Toast.makeText(context, it.title, Toast.LENGTH_SHORT).show()
                "orgs" -> startActivity(context, Intent(context, OrgsActivity::class.java), null)
            }

            true
        }
    }


}