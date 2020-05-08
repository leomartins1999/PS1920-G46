package com.example.tributeapp.model.adapters

import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.request.RequestOptions
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.activities.view_models.PostsViewModel
import com.example.tributeapp.model.dtos.Post
import com.example.tributeapp.model.dtos.User
import org.ocpsoft.prettytime.PrettyTime
import java.util.*


class PostListAdapter(private val model: PostsViewModel, private val likeHandler: (String, () -> Unit) -> Unit)
    : RecyclerView.Adapter<PostsViewHolder>() {

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

class PostsViewHolder(private val postsView: LinearLayout, private val likeHandler: (String, () -> Unit) -> Unit)
    : RecyclerView.ViewHolder(postsView) {

    private val grayLike = postsView.context.getDrawable(R.drawable.ic_like_gray)!!
    private val blueLike = postsView.context.getDrawable(R.drawable.ic_like_blue)!!

    private val owner_thumb: ImageView = postsView.findViewById(R.id.owner_pic)
    private val owner_name: TextView = postsView.findViewById(R.id.owner_name)

    private val description: TextView = postsView.findViewById(R.id.description)
    private val post_image: ImageView = postsView.findViewById(R.id.image)

    private val likeCount: TextView = postsView.findViewById(R.id.like_count)
    private val like: ImageView = postsView.findViewById(R.id.like_image)

    private val time: TextView = postsView.findViewById(R.id.time)

    private var post: Post? = null

    init {
        like.setOnClickListener{
            val newState: Boolean = like.drawable == grayLike
            val image: Drawable? = if (newState) blueLike else grayLike

            likeHandler(post!!.id){
                like.setImageDrawable(image)
                likeCount.text = "${Integer.parseInt(likeCount.text.toString()) + if (newState == true) 1 else -1}"
            }
        }
    }

    fun bindTo(post: Post) {
        this.post = post

        when(post.owner_type){
            "org" -> {
                App.cacheService.getOrg(post.owner_id){
                    Glide
                        .with(postsView.context)
                        .applyDefaultRequestOptions(
                            RequestOptions()
                                .placeholder(R.drawable.ic_error_image)
                                .error(R.drawable.ic_error_image)
                        )
                        .load(it.imageLink)
                        .into(owner_thumb)

                    owner_name.text = it.name
                }
            }
            "volunteer" -> {
                App.cacheService.getVolunteer(post.owner_id){
                    Glide
                        .with(postsView.context)
                        .applyDefaultRequestOptions(
                            RequestOptions()
                                .placeholder(R.drawable.ic_error_image)
                                .error(R.drawable.ic_error_image)
                        )
                        .load(it.imageLink)
                        .into(owner_thumb)

                    owner_name.text = it.name
                }
            }
        }

        description.text = post.description
        Glide
            .with(postsView.context)
            .applyDefaultRequestOptions(
                RequestOptions()
                    .placeholder(R.drawable.ic_error_image)
                    .error(R.drawable.ic_error_image)
            )
            .load(post.imageLink)
            .into(post_image)

        // todo: user's session
        likeCount.text = "${post.getNumberOfLikes()}"
        like.setImageDrawable(if (false) blueLike else grayLike)

        val prettyTime = PrettyTime(Locale.getDefault())
        val ago = prettyTime.format(Date(post.time))

        time.text = ago
    }
}