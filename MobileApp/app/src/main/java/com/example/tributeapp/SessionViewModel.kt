package com.example.tributeapp

import com.example.tributeapp.model.dtos.User
import com.example.tributeapp.model.dtos.Volunteer
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.nav_header_main.view.*

class SessionViewModel(private val navView: NavigationView) {

    var session = false
    lateinit var user: User
    lateinit var volunteer: Volunteer

    override fun toString(): String {
        return "Session(user=$user, volunteer=$volunteer)"
    }

    fun newSession(user: User){
        session = true
        this.user = user
        App.cacheService.getVolunteer(user.id){
            volunteer = it
            newSessionView()
        }
    }

    fun logout(){
        session = false
        logoutSessionView()
    }

    private fun newSessionView(){
        Utils.loadImage(navView.context, navView.user_picture, volunteer.imageLink, R.drawable.ic_volunteer_gray)
        navView.user_name.text = volunteer.name

        navView.menu.clear()
        navView.inflateMenu(R.menu.authenticated_menu)
    }

    private fun logoutSessionView(){
        navView.user_picture.setImageDrawable(navView.context.getDrawable(R.drawable.ic_volunteer_gray))
        navView.user_name.text = navView.context.getString(R.string.nav_header_title)

        navView.menu.clear()
        navView.inflateMenu(R.menu.unauthenticated_menu)
    }

}