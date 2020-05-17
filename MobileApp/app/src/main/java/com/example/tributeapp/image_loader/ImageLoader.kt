package com.example.tributeapp.image_loader

import android.content.Context
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.example.tributeapp.R

class ImageLoader{

    companion object{

        fun loadImage(
            context: Context,
            imageView: ImageView,
            imageLink: String?,
            hide: Boolean,
            onError: Int = R.drawable.ic_error_image
        ) {
            Glide
                .with(context)
                .load(imageLink)
                .listener(
                    ImageRequestListener(
                        imageView,
                        hide,
                        onError
                    )
                )
                .into(imageView)
        }

    }

}