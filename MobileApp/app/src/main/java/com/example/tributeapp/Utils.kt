package com.example.tributeapp

import android.content.Context
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions

class Utils {

    companion object{

        fun loadImage(
            context: Context,
            imageView: ImageView,
            imageLink: String,
            placeholderID: Int = R.drawable.ic_error_image
        ){
            Glide
                .with(context)
                .applyDefaultRequestOptions(
                    RequestOptions()
                        .placeholder(placeholderID)
                        .error(placeholderID)
                )
                .load(imageLink)
                .into(imageView)
        }

    }

}