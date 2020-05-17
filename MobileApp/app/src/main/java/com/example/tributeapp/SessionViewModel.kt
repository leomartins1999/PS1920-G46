package com.example.tributeapp

import com.example.tributeapp.image_loader.ImageLoader
import com.example.tributeapp.model.dtos.User
import com.example.tributeapp.model.dtos.Volunteer
import com.google.android.material.navigation.NavigationView
import kotlinx.android.synthetic.main.nav_header_main.view.*

class SessionViewModel(private val navView: NavigationView) {

    var hasSession = false

    lateinit var user: User

    lateinit var volunteer: Volunteer

    fun login(user: User){
        hasSession = true

        this.user = user

        App.cacheService.getVolunteer(user.id){
            volunteer = it
            newSessionView()
        }
    }

    fun logout(){
        hasSession = false
        logoutSessionView()
    }

    private fun newSessionView(){
        ImageLoader.loadImage(navView.context, navView.user_picture, volunteer.imageLink, false, R.drawable.ic_volunteer_gray)
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

    override fun toString(): String {
        return if (hasSession)
            "SessionViewModel(session=$hasSession, user=$user)"
        else
            "SessionViewModel(session=$hasSession)"
    }

}