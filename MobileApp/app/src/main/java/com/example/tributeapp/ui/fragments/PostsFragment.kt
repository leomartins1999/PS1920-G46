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
import com.example.tributeapp.ui.adapters.PostListAdapter
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.view_model_factories.PostsViewModelProviderFactory
import com.example.tributeapp.ui.view_models.PostsViewModel
import kotlinx.android.synthetic.main.fragment_posts.*
import kotlinx.android.synthetic.main.fragment_posts.view.*

class PostsFragment : Fragment() {

    private val adapter by lazy {
        PostListAdapter(model) { postId, onSuccess ->
            model.likePost(postId, onSuccess) {
                makeToast(requireContext(), "Error liking post")
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

        if (App.session!!.hasSession) root.make_post_card.visibility = View.VISIBLE

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
        enableRadioGroup()
        enablePostButton()
    }

    private fun enablePostButton() {
        requireView().post_button.setOnClickListener {
            if (!post_text.text.trim().isBlank())
                model.post(
                    post_text.text.toString(),
                    {
                        makeToast(requireContext(), getString(R.string.operation_success))
                        Handler().postDelayed({ updatePosts() }, 1000)
                    },
                    {
                        makeToast(requireContext(), getString(R.string.operation_error))
                    }
                )
            else makeToast(requireContext(), getString(R.string.post_body_empty_error))
        }
    }

    private fun updatePosts() {
        model.updatePosts { makeToast(requireContext(), "Error loading posts") }
    }

    private fun enableRadioGroup() {
        if (!App.session!!.hasSession) return

        val layout = requireView()

        layout.your_posts_radio.visibility = View.VISIBLE

        layout.select_posts_group.setOnCheckedChangeListener { _, checkedId ->
            model.updateFilter(checkedId == layout.your_posts_radio.id)
            makeToast(requireContext(), "${checkedId == layout.your_posts_radio.id}")
            updatePosts()
        }
    }

}