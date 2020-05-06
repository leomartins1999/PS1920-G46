package com.example.tributeapp.activities

import android.os.Bundle
import android.util.Log
import androidx.appcompat.widget.Toolbar
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.R
import com.example.tributeapp.adapters.PostListAdapter
import com.example.tributeapp.view_model_factories.PostsViewModelProviderFactory
import com.example.tributeapp.view_models.PostsViewModel

class MainActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Posts"

    private val adapter: PostListAdapter by lazy {
        PostListAdapter(model)
    }

    private val model: PostsViewModel by lazy {
        PostsViewModelProviderFactory().create(PostsViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState, R.layout.activity_main)

        val recyclerView = findViewById<RecyclerView>(R.id.posts)
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(this)

        model.observe(this){
            adapter.notifyDataSetChanged()
        }

        model.updatePosts()
    }
}
