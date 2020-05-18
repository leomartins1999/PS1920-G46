package com.example.tributeapp.ui.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.tributeapp.R
import com.example.tributeapp.ui.UIUtils
import com.example.tributeapp.ui.view_model_factories.RegisterViewModelProviderFactory
import com.example.tributeapp.ui.view_models.RegisterViewModel
import kotlinx.android.synthetic.main.fragment_register.view.*

class RegisterFragment : Fragment(){

    private val model by lazy {
        RegisterViewModelProviderFactory().create(RegisterViewModel::class.java)
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_register, container, false)

        root.login_button.setOnClickListener{
            val name = root.login_username.text.toString()
            val email = root.login_email.text.toString()
            val password = root.login_password.text.toString()

            model.register(
                name,
                email,
                password,
                {
                    UIUtils.makeToast(context, resources.getString(R.string.successfully_registered))
                    this.requireActivity().onBackPressed()
                },
                { UIUtils.makeToast(context, "Error")}
            )
        }

        return root
    }
}