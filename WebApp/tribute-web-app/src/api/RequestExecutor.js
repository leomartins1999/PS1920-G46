const BASE_PATH = "https://tribute-api.duckdns.org/api"

function getRequestExecutor() {
    return {
        get: get,
        post: post,
        put: put,
        delete: _delete
    }

    function get(url) { 
        return executeRequest('GET', url)
    }

    function post(url, body) {
        return executeRequest('POST', url, body)
    }

    function put(url, body) {
        return executeRequest('PUT', url, body)
    }

    function _delete(url) {
        return executeRequest('DELETE', url)
    }

    function executeRequest(method, url, body) {
        const options = {
            method: method,
            headers:{
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
        }

        if (body) options.body = JSON.stringify(body)

        console.log(options)

        return fetch(`${BASE_PATH}${url}`, options)
            .then(resp => resp.json())
            .then(json => json.body)
    }
}

export default getRequestExecutor