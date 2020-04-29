package com.example.tributeapp.activities

import android.os.Bundle
import android.view.Menu
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.MenuHandler

abstract class BaseActivity: AppCompatActivity(){

    private val menuHandler = MenuHandler()

    abstract val toolbar: Toolbar
    abstract val activityIdentifier: String

    fun onCreate(savedInstanceState: Bundle?, layoutID: Int) {
        super.onCreate(savedInstanceState)
        setContentView(layoutID)

        setSupportActionBar(toolbar)

        menuHandler.menuListener(this, toolbar)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean{
        super.onCreateOptionsMenu(menu)
        return menuHandler.inflateMenu(menuInflater, menu)
    }

}