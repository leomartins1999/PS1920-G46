package com.example.tributeapp.model.caches

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