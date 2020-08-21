package com.example.tributeapp.api

import android.content.Context
import com.example.tributeapp.api.controllers.*
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.model.dtos.*


class APIService(ctx: Context) {

    private val executor = RequestExecutor(ctx)

    private val volunteers = VolunteersController(executor)
    private val orgs = OrgsController(executor)
    private val posts = PostsController(executor)
    private val events = EventsController(executor)
    private val auth = AuthController(executor)

    fun getOrgs(searchQuery: String, onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        orgs.getOrgs(searchQuery, onSuccess, onError)

    fun getOrg(id: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        orgs.getOrg(id, onSuccess, onError)

    fun followOrg(orgID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        orgs.followOrg(orgID, onSuccess, onError)

    fun getVolunteers(searchQuery: String, onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteers(searchQuery, onSuccess, onError)

    fun getVolunteer(id: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteer(id, onSuccess, onError)

    fun followVolunteer(volunteerID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        volunteers.followVolunteer(volunteerID, onSuccess, onError)

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        posts.getPosts(onSuccess, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        posts.likePost(postID, onSuccess, onError)

    fun createPost(description: String, onSuccess: () -> Unit, onError: () -> Unit) =
        posts.create(description, onSuccess, onError)

    fun getEvents(onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        events.getEvents(onSuccess, onError)

    fun interestedInEvent(eventID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        events.interested(eventID, onSuccess, onError)

    fun login(email: String, password: String, onSuccess: (User) -> Unit, onError: () -> Unit) =
        auth.login(email, password, onSuccess, onError)

    fun register(user: String, email: String, password: String, onSuccess: () -> Unit, onError: () -> Unit) =
        auth.register(user, email, password, onSuccess, onError)

    fun updateVolunteer(volunteerID: String, description: String?, linkedinLink: String?, onSuccess: () -> Unit, onError: () -> Unit) {
        volunteers.updateVolunteer(volunteerID, description, linkedinLink, onSuccess, onError)
    }

    fun updateVolunteerImg(volunteerID: String, imageContent: ByteArray, onSuccess: () -> Unit, onError: () -> Unit) {
        volunteers.updateImage(volunteerID, imageContent, onSuccess, onError)
    }
}