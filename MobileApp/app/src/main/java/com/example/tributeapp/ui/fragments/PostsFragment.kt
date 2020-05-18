package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.os.Handler
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.UIUtils
import com.example.tributeapp.model.adapters.PostListAdapter
import com.example.tributeapp.ui.view_model_factories.PostsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.PostsViewModel
import kotlinx.android.synthetic.main.fragment_posts.*
import kotlinx.android.synthetic.main.fragment_posts.view.*

class PostsFragment : Fragment() {

    private val adapter by lazy {
        PostListAdapter(model) { postId, onSuccess ->
            model.likePost(postId, onSuccess) {
                UIUtils.makeToast(context, "Error liking post")
            }
        }
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

        model.observe(this) {
            adapter.notifyDataSetChanged()
        }

        return root
    }

    override fun onStart() {
        super.onStart()

        updatePosts()
        enablePostButton()
    }

    private fun enablePostButton() {
        if (App.session!!.hasSession) {
            requireView().post_button.setOnClickListener {
                if (!post_text.text.trim().isBlank())
                    model.post(
                        post_text.text.toString(),
                        {
                            UIUtils.makeToast(context, getString(R.string.operation_success))
                            Handler().postDelayed({ updatePosts() }, 1000)
                        },
                        {
                            UIUtils.makeToast(context, getString(R.string.operation_error))
                        }
                    )
                else UIUtils.makeToast(context, getString(R.string.post_body_empty_error))
            }
        } else requireView().post_button.setOnClickListener { UIUtils.onClickAuthenticatedMessage(it) }
    }

    private fun updatePosts() {
        model.updatePosts { UIUtils.makeToast(context, "Error loading posts") }
    }

}