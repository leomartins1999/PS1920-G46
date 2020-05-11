package com.example.tributeapp.api

import android.content.Context
import com.example.tributeapp.api.controllers.EventsController
import com.example.tributeapp.api.controllers.OrgsController
import com.example.tributeapp.api.controllers.PostsController
import com.example.tributeapp.api.controllers.VolunteersController
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Event
import com.example.tributeapp.model.dtos.Org
import com.example.tributeapp.model.dtos.Post
import com.example.tributeapp.model.dtos.Volunteer


class APIService(ctx: Context) {

    private val executor = RequestExecutor(ctx)

    private val volunteers = VolunteersController(executor)
    private val orgs = OrgsController(executor)
    private val posts = PostsController(executor)
    private val events = EventsController(executor)

    fun getOrgs(onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        orgs.getOrgs(onSuccess, onError)

    fun getOrg(key: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        orgs.getOrg(key, onSuccess, onError)

    fun getVolunteers(onSuccess: (List<Volunteer>) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteers(onSuccess, onError)

    fun getVolunteer(key: String, onSuccess: (Volunteer) -> Unit, onError: () -> Unit) =
        volunteers.getVolunteer(key, onSuccess, onError)

    fun getPosts(onSuccess: (List<Post>) -> Unit, onError: () -> Unit) =
        posts.getPosts(onSuccess, onError)

    fun likePost(postID: String, onSuccess: () -> Unit, onError: () -> Unit) =
        onSuccess()

    fun getEvents(onSuccess: (List<Event>) -> Unit, onError: () -> Unit) =
        events.getEvents(onSuccess, onError)
}