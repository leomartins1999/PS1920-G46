package com.example.tributeapp.caches

import com.example.tributeapp.model.Volunteer

class Cache<T>(private val source: (String, (T) -> Unit) -> Unit){

    private val cache = HashMap<String, T>()

    fun add(key: String, value: T){
        cache[key] = value
    }

    fun request(key: String, onSuccess: (T) -> Unit){
        if (cache.containsKey(key)) onSuccess(cache[key]!!)
        else{
            source(key){
                add(key, it)
                onSuccess(it)
            }
        }
    }

}