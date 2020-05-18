package com.example.tributeapp.api.controllers

import com.example.tributeapp.api.ORGS_URL
import com.example.tributeapp.api.followOrgURL
import com.example.tributeapp.api.request_executor.RequestExecutor
import com.example.tributeapp.api.orgURL
import com.example.tributeapp.api.parser.ListParser
import com.example.tributeapp.api.parser.SingletonParser
import com.example.tributeapp.model.dtos.Org

class OrgsController(private val executor: RequestExecutor) {

    fun getOrgs(onSuccess: (List<Org>) -> Unit, onError: () -> Unit) =
        executor.get(ORGS_URL, ListParser(onSuccess) { Org(it) }, onError)

    fun getOrg(id: String, onSuccess: (Org) -> Unit, onError: () -> Unit) =
        executor.get(orgURL(id), SingletonParser(onSuccess) { Org(it) }, onError)

    fun followOrg(id: String, onSuccess: () -> Unit, onError: () -> Unit) =
        executor.put(followOrgURL(id), onSuccess, onError)

}