package com.example.tributeapp.api.parser

import android.os.AsyncTask

abstract class Parser<T>: AsyncTask<String, Int, T>()