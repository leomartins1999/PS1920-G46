package com.example.tributeapp.ui

import android.content.Context
import android.util.Patterns
import android.view.View
import android.widget.Toast
import com.example.tributeapp.R
import java.util.regex.Pattern

const val PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{4,}$"
const val MINIMUM_PASSWORD_LENGTH = 8

val pattern: Pattern = Pattern.compile(PASSWORD_PATTERN)

fun String.isPasswordValid(): Boolean{
    return this.length >= MINIMUM_PASSWORD_LENGTH && pattern.matcher(this).matches()
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