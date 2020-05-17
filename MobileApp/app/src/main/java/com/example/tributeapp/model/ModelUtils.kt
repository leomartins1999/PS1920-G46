package com.example.tributeapp.model

import com.example.tributeapp.api.BASE_URL

class ModelUtils{

    companion object{

        fun parseImageLink(link: String?): String? {
            if (link == null) return null

            return if (!link.startsWith("/images")) link
            else BASE_URL + link
        }

    }

}