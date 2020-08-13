package com.example.tributeapp.ui.image_loader

import android.content.Context
import android.widget.ImageView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.engine.DiskCacheStrategy
import com.example.tributeapp.R

class ImageLoader {

    companion object {

        fun loadImage(
            context: Context,
            imageView: ImageView,
            imageLink: String?,
            hide: Boolean,
            onError: Int = R.drawable.ic_error_image,
            skipCache: Boolean = false
        ) {
            var load = Glide
                .with(context)
                .load(imageLink)

            if (skipCache) {
                load = load
                    .diskCacheStrategy(DiskCacheStrategy.NONE)
                    .skipMemoryCache(true)
            }
            load
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