package com.example.tributeapp.activities.activities

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.R
import com.example.tributeapp.model.adapters.PostListAdapter
import com.example.tributeapp.activities.view_model_factories.PostsViewModelProviderFactory
import com.example.tributeapp.activities.view_models.PostsViewModel

class MainActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Posts"

    private val adapter: PostListAdapter by lazy {
        PostListAdapter(model){id, cb -> handleLike(id, cb)}
    }

    private val model: PostsViewModel by lazy {
        PostsViewModelProviderFactory().create(PostsViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_main)

        val recyclerView = findViewById<RecyclerView>(R.id.posts)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        model.updatePosts()
    }

    private fun handleLike(postId: String, onSuccess: () -> Unit){
        model.likePost("-1", postId, onSuccess){
            Toast.makeText(this, getText(R.string.error_performing_action), Toast.LENGTH_SHORT).show()
        }
    }

}
