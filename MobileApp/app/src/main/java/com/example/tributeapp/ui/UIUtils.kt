package com.example.tributeapp.ui

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.util.Patterns
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import androidx.fragment.app.Fragment
import com.example.tributeapp.R
import com.example.tributeapp.ui.fragments.PICK_IMAGE
import java.io.ByteArrayOutputStream


const val MINIMUM_PASSWORD_LENGTH = 8

fun String.isPasswordValid(): Boolean {
    return this.length >= MINIMUM_PASSWORD_LENGTH
}

fun String.isEmailValid(): Boolean {
    return this.isNotEmpty() && Patterns.EMAIL_ADDRESS.matcher(this).matches()
}

fun makeToast(context: Context, message: String) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
}

fun Bitmap.getImageContent(): ByteArray{
    val stream = ByteArrayOutputStream();
    this.compress(Bitmap.CompressFormat.PNG, 100, stream);
    val content = stream.toByteArray();
    this.recycle()
    return content
}

fun Fragment.selectImage(){
    val intent = Intent()
    intent.type = "image/*"
    intent.action = Intent.ACTION_GET_CONTENT
    this.startActivityForResult(
        Intent.createChooser(intent, "Select Picture"),
        PICK_IMAGE
    )
}

fun onClickAuthenticatedMessage(v: View) {
    makeToast(
        v.context,
        v.context.getString(R.string.authentication_required)
    )
}

fun renderClickableIcon(protocol: String, path: String?, view: View, context: Context) {
    if (path.isNullOrEmpty() || path == "null") view.visibility = View.GONE
    else view.setOnClickListener {
        startActivity(
            context,
            Intent(Intent.ACTION_VIEW, Uri.parse("${protocol}${path}")),
            null
        )
    }
}

fun renderTextView(text: String?, textView: TextView) {
    if (text.isNullOrEmpty() || text == "null") textView.visibility = View.GONE
    else {
        textView.text = text
        textView.visibility = View.VISIBLE
    }
}