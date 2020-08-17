package com.example.tributeapp.ui.fragments

import android.app.AlertDialog
import android.app.Dialog
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.ImageDecoder
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.Window
import androidx.fragment.app.DialogFragment
import com.example.tributeapp.APP_TAG
import com.example.tributeapp.R
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.view_model_factories.EditVolunteerViewModelProviderFactory
import com.example.tributeapp.ui.view_models.EditVolunteerViewModel
import kotlinx.android.synthetic.main.dialog_edit_volunteer.*
import java.io.ByteArrayOutputStream

const val PICK_IMAGE = 1

class EditVolunteerFragment(
    private val volDescription: String,
    private val volLinkedin: String,
    private val onUpdate: () -> Unit
) : DialogFragment() {

    private val model by lazy {
        EditVolunteerViewModelProviderFactory().create(EditVolunteerViewModel::class.java)
    }
    lateinit var dialogView: AlertDialog
    var image: Bitmap? = null;

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.dialog_edit_volunteer, container, false)
    }

    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog {
        val dialog = super.onCreateDialog(savedInstanceState)
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dialog.setContentView(R.layout.dialog_edit_volunteer)

        return activity?.let {
            val dialog = AlertDialog.Builder(it)
                .setView(R.layout.dialog_edit_volunteer)
                .setTitle(R.string.dialog_edit_volunteer)
                .setPositiveButton(R.string.edit, null)
                .setNegativeButton(R.string.cancel) { _, _ -> }
                .create()
            dialog.setOnShowListener {
                val itDialog = it as AlertDialog
                itDialog.description.setText(volDescription)
                itDialog.linkedinLink.setText(volLinkedin)
                itDialog
                    .getButton(AlertDialog.BUTTON_POSITIVE)
                    .setOnClickListener { updateVolunteer(dialog) }
                itDialog.imageButton.setOnClickListener { selectImg() }
                dialogView = itDialog
            }

            return dialog
        } ?: throw IllegalStateException("Activity cannot be null")
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.v(APP_TAG, "request code: $requestCode, result code: $resultCode")
        Log.v(APP_TAG, "data:  $data")

        if (requestCode == PICK_IMAGE && data != null) {
            image = MediaStore.Images.Media.getBitmap(requireContext().contentResolver, data.data)
            dialogView.image.setImageBitmap(image)
        }
    }

    private fun getImageContent(): ByteArray {
        val stream = ByteArrayOutputStream();
        image!!.compress(Bitmap.CompressFormat.PNG, 100, stream);
        val content = stream.toByteArray();
        image!!.recycle()
        return content
    }

    private fun updateVolunteer(dialog: AlertDialog) {
        model.updateVolunteer(
            dialog.description.text.toString(),
            dialog.linkedinLink.text.toString(),
            {
                makeToast(dialog.context, "Updated profile")
                if (image != null) {
                    updateVolunteerImg(dialog)
                } else {
                    onUpdate()
                    dialog.dismiss()
                }

            },
            { makeToast(dialog.context, "Failed to update profile") }
        )
    }

    private fun updateVolunteerImg(dialog: AlertDialog) {
        model.updateVolunteerImg(
            getImageContent(),
            {
                makeToast(dialog.context, "Updated volunteer image")
                onUpdate()
                dialog.dismiss()
            },
            { makeToast(dialog.context, "Failed to update volunteer image") }
        )
    }

    private fun selectImg() {
        val intent = Intent()
        intent.type = "image/*"
        intent.action = Intent.ACTION_GET_CONTENT
        startActivityForResult(
            Intent.createChooser(intent, "Select Picture"),
            PICK_IMAGE
        )
    }
}