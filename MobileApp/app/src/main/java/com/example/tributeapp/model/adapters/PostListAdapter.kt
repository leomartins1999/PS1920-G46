package com.example.tributeapp.model.adapters

import android.content.Intent
import android.graphics.drawable.Drawable
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.cardview.widget.CardView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.image_loader.ImageLoader
import com.example.tributeapp.ui.view_models.PostsViewModel
import com.example.tributeapp.model.dtos.Post
import com.example.tributeapp.model.dtos.Volunteer
import com.example.tributeapp.model.dtos.updateUser
import com.example.tributeapp.ui.activities.ORG_KEY
import com.example.tributeapp.ui.activities.OrgActivity
import com.example.tributeapp.ui.activities.VOLUNTEER_KEY
import com.example.tributeapp.ui.activities.VolunteerActivity
import com.example.tributeapp.ui.onClickAuthenticatedMessage
import org.ocpsoft.prettytime.PrettyTime
import java.util.*

val prettyTime = PrettyTime(Locale.getDefault())

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

class PostsViewHolder(
    private val postsView: LinearLayout,
    private val likeHandler: (String, () -> Unit) -> Unit
) : RecyclerView.ViewHolder(postsView) {

    // todo: turn references into static ones
    private val grayLike = postsView.context.getDrawable(R.drawable.ic_like_gray)!!
    private val blueLike = postsView.context.getDrawable(R.drawable.ic_like_blue)!!

    private val ownerCard: CardView = postsView.findViewById(R.id.owner_card)
    private val ownerThumb: ImageView = postsView.findViewById(R.id.owner_pic)
    private val ownerName: TextView = postsView.findViewById(R.id.owner_name)

    private val description: TextView = postsView.findViewById(R.id.description)
    private val postImage: ImageView = postsView.findViewById(R.id.image)

    private val likeCount: TextView = postsView.findViewById(R.id.like_count)
    private val like: ImageView = postsView.findViewById(R.id.like_image)

    private val time: TextView = postsView.findViewById(R.id.time)

    private var post: Post? = null

    init {
        if (App.session!!.hasSession)
            like.setOnClickListener {
                val newState: Boolean = like.drawable == grayLike
                val image: Drawable? = if (newState) blueLike else grayLike

                likeHandler(post!!.id) {
                    post!!.likes.updateUser(App.session!!.user)
                    like.setImageDrawable(image)
                    likeCount.text = post!!.likes.size.toString()
                }
            }
        else like.setOnClickListener{ onClickAuthenticatedMessage(it)}
    }

    fun bindTo(post: Post) {
        this.post = post

        App.cacheService.getEntity(post.ownerID, post.ownerType){
            ImageLoader.loadImage(postsView.context, ownerThumb, it.imageLink, false, R.drawable.ic_volunteer_gray)
            ownerName.text = it.name
        }

        ownerCard.setOnClickListener{
            val intent = Intent(postsView.context, if (post.ownerType == "org") OrgActivity::class.java else VolunteerActivity::class.java)
            intent.putExtra(if (post.ownerType == "org") ORG_KEY else VOLUNTEER_KEY, post.ownerID)
            postsView.context.startActivity(intent)
        }

        description.text = post.description
        ImageLoader.loadImage(postsView.context, postImage, post.imageLink, true)

        likeCount.text = "${post.getNumberOfLikes()}"
        like.setImageDrawable(if (App.session!!.hasSession && post.likes.contains(App.session!!.user)) blueLike else grayLike)

        time.text = prettyTime.format(Date(post.time))
    }
}