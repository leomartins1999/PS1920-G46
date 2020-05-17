package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.ORGS_URL
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.orgURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Org

class OrgsController(private val executor: RequestExecutor) {

    fun getOrgs(onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        executor.get(ORGS_URL, ListParser(onSuccess) { Org(it) }, onError)

    fun getOrg(key: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        executor.get(orgURL(key), SingletonParser(onSuccess) { Org(it) }, onError)

    fun followOrg(orgID: String, onSuccess: () -> Unit, onError: () -> Unit){
        throw NotImplementedError()
    }

}