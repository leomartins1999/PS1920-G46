package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.Utils
import com.example.tributeapp.ui.view_model_factories.LoginViewModelProviderFactory
import com.example.tributeapp.ui.view_models.LoginViewModel
import kotlinx.android.synthetic.main.fragment_login.view.*

class LoginFragment: Fragment(){

    private val model by lazy {
        LoginViewModelProviderFactory().create(LoginViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_login, container, false)

        root.login_button.setOnClickListener{
            val email = root.login_email.text.toString()
            val password = root.login_password.text.toString()

            model.login(
                email,
                password,
                {
                    Utils.makeToast(context, resources.getString(R.string.executed_login))
                    this.requireActivity().onBackPressed()
                },
                {Utils.makeToast(context, "Error")}
            )
        }

        return root
    }

}