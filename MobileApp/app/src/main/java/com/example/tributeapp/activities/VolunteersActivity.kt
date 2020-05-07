package com.example.tributeapp.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import com.example.tributeapp.R
import com.example.tributeapp.model.Volunteer
import com.example.tributeapp.view_model_factories.VolunteersViewModelProviderFactory
import com.example.tributeapp.view_models.VolunteersViewModel

class VolunteersActivity : BaseActivity() {

    override val toolbar: Toolbar
        get() = findViewById(R.id.toolbar)
    override val activityIdentifier: String
        get() = "Volunteers"

    private val model: VolunteersViewModel by lazy {
        VolunteersViewModelProviderFactory().create(VolunteersViewModel::class.java)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        super.onCreate(R.layout.activity_volunteers)

        model.observe(this){
            if (it.isNotEmpty()){
                val intent = Intent(this, VolunteerActivity::class.java)
                //intent.putExtra("volunteer", it.first())
                startActivity(intent)
            }
        }

        model.updateVolunteers()
    }
}
