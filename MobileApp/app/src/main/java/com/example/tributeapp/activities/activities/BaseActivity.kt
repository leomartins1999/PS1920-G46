package com.example.tributeapp.activities.activities

import android.view.Menu
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.R
import com.example.tributeapp.activities.MenuHandler

abstract class BaseActivity: AppCompatActivity(){

    private val menuHandler = MenuHandler()

    abstract val toolbar: Toolbar
    abstract val activityIdentifier: String

    fun onCreate(layoutID: Int) {
        setContentView(layoutID)

        setSupportActionBar(toolbar)

        menuHandler.menuListener(this, toolbar)
    }

    override fun setContentView(view: View?) {
        super.setContentView(view)
        view!!.setBackgroundColor(R.color.background)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean{
        super.onCreateOptionsMenu(menu)
        return menuHandler.inflateMenu(menuInflater, menu)
    }

}