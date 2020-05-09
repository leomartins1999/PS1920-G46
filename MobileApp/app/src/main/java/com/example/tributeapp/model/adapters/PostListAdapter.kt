package com.example.tributeapp.model.adapters

import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.activities.view_models.PostsViewModel
import com.example.tributeapp.model.dtos.Post
import org.ocpsoft.prettytime.PrettyTime
import java.util.*


class PostListAdapter(
    private val model: PostsViewModel,
    private val likeHandler: (String, () -> Unit) -> Unit
) : RecyclerView.Adapter<PostsViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostsViewHolder {
        val postsView = LayoutInflater.from(parent.context)
            .inflate(R.layout.post_list_element, parent, false) as LinearLayout
        return PostsViewHolder(postsView, likeHandler)
    }

    override fun getItemCount(): Int {
        return model.posts.size
    }

    override fun onBindViewHolder(holder: PostsViewHolder, position: Int) {
        holder.bindTo(model.posts[position])
    }
}

val prettyTime = PrettyTime(Locale.getDefault())

class PostsViewHolder(
    private val postsView: LinearLayout,
    private val likeHandler: (String, () -> Unit) -> Unit
) : RecyclerView.ViewHolder(postsView) {

    private val grayLike = postsView.context.getDrawable(R.drawable.ic_like_gray)!!
    private val blueLike = postsView.context.getDrawable(R.drawable.ic_like_blue)!!

    private val ownerThumb: ImageView = postsView.findViewById(R.id.owner_pic)
    private val ownerName: TextView = postsView.findViewById(R.id.owner_name)

    private val description: TextView = postsView.findViewById(R.id.description)
    private val postImage: ImageView = postsView.findViewById(R.id.image)

    private val likeCount: TextView = postsView.findViewById(R.id.like_count)
    private val like: ImageView = postsView.findViewById(R.id.like_image)

    private val time: TextView = postsView.findViewById(R.id.time)

    private var post: Post? = null

    init {
        like.setOnClickListener {
            val newState: Boolean = like.drawable == grayLike
            val image: Drawable? = if (newState) blueLike else grayLike

            likeHandler(post!!.id) {
                like.setImageDrawable(image)
                likeCount.text =
                    "${Integer.parseInt(likeCount.text.toString()) + if (newState == true) 1 else -1}"
            }
        }
    }

    fun bindTo(post: Post) {
        this.post = post

        when (post.owner_type) {
            "org" -> App.cacheService.getOrg(post.owner_id) {
                Utils.loadImage(postsView.context, ownerThumb, it.imageLink, R.drawable.ic_volunteer_gray)
                ownerName.text = it.name
            }
            "volunteer" -> App.cacheService.getVolunteer(post.owner_id) {
                Utils.loadImage(postsView.context, ownerThumb, it.imageLink, R.drawable.ic_volunteer_gray)
                ownerName.text = it.name
            }
        }

        description.text = post.description
        Utils.loadImage(postsView.context, postImage, post.imageLink)

        // todo: user's session
        likeCount.text = "${post.getNumberOfLikes()}"
        like.setImageDrawable(if (false) blueLike else grayLike)

        val prettyTime = PrettyTime(Locale.getDefault())

        time.text = prettyTime.format(Date(post.time))
    }
}