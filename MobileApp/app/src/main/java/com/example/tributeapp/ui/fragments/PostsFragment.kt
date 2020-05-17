package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.R
import com.example.tributeapp.ui.UIUtils
import com.example.tributeapp.model.adapters.PostListAdapter
import com.example.tributeapp.ui.view_model_factories.PostsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.PostsViewModel
import kotlinx.android.synthetic.main.fragment_posts.view.*

class PostsFragment : Fragment() {

    private val adapter by lazy {
        PostListAdapter(model) { postId, onSuccess ->
            model.likePost(postId, onSuccess) {
                UIUtils.makeToast(context, "Error liking post")
            } }
    }

    private val model by lazy {
        PostsViewModelProviderFactory().create(PostsViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_posts, container, false)

        root.posts_recycler_view.adapter = adapter
        root.posts_recycler_view.layoutManager = LinearLayoutManager(this.context)

        model.observe(this) { adapter.notifyDataSetChanged() }

        model.updatePosts { UIUtils.makeToast(context, "Error loading posts") }

        return root
    }

}