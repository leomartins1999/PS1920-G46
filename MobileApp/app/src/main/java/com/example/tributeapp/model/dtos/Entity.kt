package com.example.tributeapp.model.dtos

import kotlin.String

abstract class Entity {

    abstract val id: String
    abstract val name: String
    abstract val imageLink: String
    abstract val followers: List<User>

}