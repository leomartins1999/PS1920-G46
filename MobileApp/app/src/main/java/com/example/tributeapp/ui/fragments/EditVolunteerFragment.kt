package com.example.tributeapp.ui.fragments

import android.app.AlertDialog
import android.app.Dialog
import android.content.DialogInterface
import android.os.Bundle
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

class EditVolunteerFragment(private val volDescription: String, private val volLinkedin: String, private val onUpdate: () -> Unit) : DialogFragment() {

    private val model by lazy {
        EditVolunteerViewModelProviderFactory().create(EditVolunteerViewModel::class.java)
    }

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
                .setPositiveButton(R.string.edit,null)
                .setNegativeButton(R.string.cancel) { _, _ ->}
                .create()
            dialog.setOnShowListener {
                val itDialog = it as AlertDialog
                itDialog.description.setText(volDescription)
                itDialog.linkedinLink.setText(volLinkedin)
                itDialog
                    .getButton(AlertDialog.BUTTON_POSITIVE)
                    .setOnClickListener {
                        model.updateVolunteer(
                            dialog.description.text.toString(),
                            dialog.linkedinLink.text.toString(),
                            {
                                makeToast(dialog.context, "Updated profile")
                                onUpdate()
                                dialog.dismiss()
                            },
                            { makeToast(dialog.context, "Failed to update profile")}
                        )
                    }
            }

            return dialog
        }?: throw IllegalStateException("Activity cannot be null")

        //return dialog;
    }



}