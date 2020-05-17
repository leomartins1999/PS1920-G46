package com.example.tributeapp.ui.activities

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.tributeapp.*
import com.example.tributeapp.ui.Session
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.app_bar_main.*

private val FRAGMENTS = setOf(
    R.id.posts_fragment,
    R.id.volunteers_fragment,
    R.id.orgs_fragment,
    R.id.events_fragment,
    R.id.login_fragment,
    R.id.logout_fragment
)

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration

    private val drawerLayout by lazy {
        findViewById<DrawerLayout>(R.id.drawer_layout)
    }

    private val navView by lazy {
        findViewById<NavigationView>(R.id.nav_view)
    }

    private val navController by lazy {
        findNavController(R.id.nav_host_fragment)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setSupportActionBar(toolbar)

        appBarConfiguration = AppBarConfiguration(FRAGMENTS, drawerLayout)
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

        // associate navigation view w/ session to update it
        App.session = Session(navView)
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

}
