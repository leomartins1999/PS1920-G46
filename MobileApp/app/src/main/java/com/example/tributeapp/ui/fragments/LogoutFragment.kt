package com.example.tributeapp.ui.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.tributeapp.App
import com.example.tributeapp.R
import com.example.tributeapp.ui.UIUtils

class LogoutFragment: Fragment(){

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        App.endSession()
        UIUtils.makeToast(context, resources.getString(R.string.executed_logout))
        this.requireActivity().onBackPressed()
    }

}