package com.example.tributeapp.ui.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.makeToast

class LogoutFragment: Fragment(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        App.endSession()
        makeToast(context, resources.getString(R.string.executed_logout))
        this.requireActivity().onBackPressed()
    }

}