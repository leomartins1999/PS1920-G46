package com.example.tributeapp.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.model.Post
import com.example.tributeapp.view_models.PostsViewModel

class PostListAdapter(private val model: PostsViewModel)
    : RecyclerView.Adapter<PostsViewHolder>(){

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostsViewHolder {
        val postsView = LayoutInflater.from(parent.context)
            .inflate(R.layout.post_list_element, parent, false) as LinearLayout
        return PostsViewHolder(postsView)
    }

    override fun getItemCount(): Int {
        return model.posts.size
    }

    override fun onBindViewHolder(holder: PostsViewHolder, position: Int) {
        holder.bindTo(model.posts[position])
    }

}

class PostsViewHolder(private val postsView: LinearLayout)
    :RecyclerView.ViewHolder(postsView){

    private val owner_id: TextView = postsView.findViewById(R.id.owner_id)
    private val description: TextView = postsView.findViewById(R.id.description)

    fun bindTo(post: Post){
        owner_id.text = post.owner_id
        description.text = post.description
    }
}