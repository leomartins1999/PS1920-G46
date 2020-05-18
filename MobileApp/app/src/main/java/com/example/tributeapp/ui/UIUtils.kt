package com.example.tributeapp.ui

import android.content.Context
import android.util.Patterns
import android.view.View
import android.widget.Toast
import com.example.tributeapp.R
import java.util.regex.Pattern

const val MINIMUM_PASSWORD_LENGTH = 8

fun String.isPasswordValid(): Boolean{
    return this.length >= MINIMUM_PASSWORD_LENGTH
}

fun String.isEmailValid(): Boolean{
    return this.isNotEmpty() && Patterns.EMAIL_ADDRESS.matcher(this).matches()
}

fun makeToast(context: Context?, message: String) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
}

fun onClickAuthenticatedMessage(v: View) {
    makeToast(
        v.context,
        v.context.getString(R.string.authentication_required)
    )
}