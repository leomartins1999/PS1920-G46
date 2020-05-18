package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.tributeapp.R
import com.example.tributeapp.ui.isEmailValid
import com.example.tributeapp.ui.isPasswordValid
import com.example.tributeapp.ui.makeToast
import com.example.tributeapp.ui.view_model_factories.RegisterViewModelProviderFactory
import com.example.tributeapp.ui.view_models.RegisterViewModel
import kotlinx.android.synthetic.main.fragment_register.view.*

class RegisterFragment : Fragment() {

    private val model by lazy {
        RegisterViewModelProviderFactory().create(RegisterViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_register, container, false)

        root.login_button.setOnClickListener {
            val name = root.login_username.text.toString()
            val email = root.login_email.text.toString()
            val password = root.login_password.text.toString()
            val confirmation = root.confirm_password.text.toString()

            if (registerIsValid(name, email, password, confirmation))
                model.register(
                    name,
                    email,
                    password,
                    {
                        makeToast(context, resources.getString(R.string.successfully_registered))
                        this.requireActivity().onBackPressed()
                    },
                    { makeToast(context, "Error") }
                )
        }

        return root
    }

    private fun registerIsValid(name: String, email: String, password: String, confirmation: String): Boolean {
        if (name.isEmpty()) makeToast(context, getString(R.string.name_must_not_be_empty_error))
        else if (!email.isEmailValid()) makeToast(context, getString(R.string.email_is_invalid))
        else if (!password.isPasswordValid()) makeToast(context, getString(R.string.password_is_invalid))
        else if (password != confirmation) makeToast(context, getString(R.string.password_arent_equal))
        else return true

        return false
    }
}