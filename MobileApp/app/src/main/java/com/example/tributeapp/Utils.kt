package com.example.tributeapp

import android.content.Context
import android.view.View
import android.widget.Toast
import com.example.tributeapp.api.BASE_URL

class Utils {

    companion object {

        fun makeToast(context: Context?, message: String) {
            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
        }

        fun onClickAuthenticatedMessage(v: View) {
            makeToast(v.context, v.context.getString(R.string.authentication_required))
        }

        fun parseImageLink(link: String?): String? {
            if (link == null) return null

            return if (!link.startsWith("/images")) link
            else BASE_URL + link
        }

    }

}