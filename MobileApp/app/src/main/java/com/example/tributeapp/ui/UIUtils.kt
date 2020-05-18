package com.example.tributeapp.ui

import android.content.Context
import android.view.View
import android.widget.Toast
import com.example.tributeapp.R

class UIUtils {

    companion object {

        fun makeToast(context: Context?, message: String) {
            Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
        }

        fun onClickAuthenticatedMessage(v: View) {
            makeToast(
                v.context,
                v.context.getString(R.string.authentication_required)
            )
        }

    }

}