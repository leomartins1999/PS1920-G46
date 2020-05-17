package com.example.tributeapp.image_loader

import android.graphics.drawable.Drawable
import android.view.View
import android.widget.ImageView
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target

class ImageRequestListener(
    private val imageView: ImageView,
    private val hideView: Boolean,
    private val placeholderImage: Int
)
    : RequestListener<Drawable> {
    override fun onLoadFailed(
        e: GlideException?,
        model: Any?,
        target: Target<Drawable>?,
        isFirstResource: Boolean
    ): Boolean {
        if (hideView) return false

        imageView.visibility = View.VISIBLE
        imageView.setImageResource(placeholderImage)
        return true
    }

    override fun onResourceReady(
        resource: Drawable?,
        model: Any?,
        target: Target<Drawable>?,
        dataSource: DataSource?,
        isFirstResource: Boolean
    ): Boolean {
        imageView.visibility = View.VISIBLE
        return false
    }
}