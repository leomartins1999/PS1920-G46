package com.example.tributeapp.ui.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.tributeapp.App

class LogoutFragment: Fragment(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        App.session!!.logout()
        this.requireActivity().onBackPressed()
    }

}