package com.example.tributeapp.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.tributeapp.App
import com.example.tributeapp.ui.activities.VOLUNTEER_KEY
import com.example.tributeapp.ui.activities.VolunteerActivity

class ProfileFragment: Fragment(){

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        val intent = Intent(context, VolunteerActivity::class.java)
        intent.putExtra(VOLUNTEER_KEY, App.session!!.user.id)
        requireActivity().onBackPressed()
        startActivity(intent)

        return super.onCreateView(inflater, container, savedInstanceState)
    }

}