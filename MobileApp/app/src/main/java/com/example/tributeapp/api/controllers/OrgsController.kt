package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.followOrgURL
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.orgURL
import com.example.tributeapp.api.orgsURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Org

class OrgsController(private val executor: RequestExecutor) {

    fun getOrgs(searchQuery: String, onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        executor.get(orgsURL(searchQuery), ListParser(onSuccess) { Org(it) }, onError)

    fun getOrg(id: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        executor.get(orgURL(id), SingletonParser(onSuccess) { Org(it) }, onError)

    fun followOrg(id: String, onSuccess: () -> Unit, onError: () -> Unit) =
        executor.put(followOrgURL(id), onSuccess, onError)

}