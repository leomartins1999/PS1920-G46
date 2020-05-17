package com.example.tributeapp.api

import android.content.Context
import com.example.tributeapp.App
import com.example.tributeapp.api.controllers.*
import com.example.tributeapp.model.dtos.*


class APIService(ctx: Context) {

    private val executor = RequestExecutor(ctx)

    private val volunteers = VolunteersController(executor)
    private val orgs = OrgsController(executor)
    private val posts = PostsController(executor)
    private val events = EventsController(executor)
    private val auth = AuthController(executor)

    fun getOrgs(onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        orgs.getOrgs(onSuccess, onError)

    fun getOrg(id: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        orgs.getOrg(id, onSuccess, onError)

    fun followOrg(sessionID: String, orgID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        orgs.followOrg(sessionID, orgID, onSuccess, onError)

    fun getVolunteers(onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteers(onSuccess, onError)

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteer(key, onSuccess, onError)

    fun followVolunteer(sessionID: String, volunteerID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        orgs.followVolunteer(sessionID, volunteerID, onSuccess, onError)

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        posts.getPosts(onSuccess, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        posts.likePost(App.session!!.user.id, postID, onSuccess, onError)

    fun getEvents(onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        events.getEvents(onSuccess, onError)

    fun login(email: String, password: String, onSuccess: (User) -> Unit, onError: () -> Unit) =
        auth.login(email, password, onSuccess, onError)
}