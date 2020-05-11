package com.example.tributeapp.ui.view_models

import androidx.lifecycle.ViewModel
import com.example.tributeapp.model.dtos.Entity

abstract class EntityViewModel: ViewModel(){

    abstract val model: List<Entity>

}