package com.example.tributeapp.ui.fragments

import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.os.Handler
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.adapters.PostListAdapter
import com.example.tributeapp.ui.getImageContent
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.selectImage
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

    private var image: Bitmap? = null

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
        select_image_button.setOnClickListener { selectImage() }

        requireView().post_button.setOnClickListener {
            if (!post_text.text.trim().isBlank()) createPost()
            else makeToast(requireContext(), getString(R.string.post_body_empty_error))
        }
    }

    private fun createPost() {
        model.post(
            post_text.text.toString(),
            { updatePostImage(it) },
            {
                makeToast(requireContext(), getString(R.string.operation_error))
            }
        )
    }

    private fun updatePostImage(post_id: String) {
        val onSuccess: () -> Unit = {
            post_text.setText("")
            makeToast(requireContext(), getString(R.string.operation_success))
            Handler().postDelayed({ updatePosts() }, 1000)
        }

        if (image == null) onSuccess()
        else model.updatePostImage(
            post_id,
            image!!.getImageContent(),
            onSuccess
        )
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
            updatePosts()
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.v(APP_TAG, "request code: $requestCode, result code: $resultCode")
        Log.v(APP_TAG, "data:  $data")

        if (requestCode == PICK_IMAGE && data != null) {
            image = MediaStore.Images.Media.getBitmap(requireContext().contentResolver, data.data)
            post_image.setImageBitmap(image)
            post_image.visibility = View.VISIBLE
        }
    }

}