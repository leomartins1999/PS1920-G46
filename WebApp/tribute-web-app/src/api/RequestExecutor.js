const BASE_PATH = "http://tribute-api.duckdns.org/api"

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
        }

        if (body) options.body = JSON.stringify(body)

        return fetch(`${BASE_PATH}${url}`, options)
            .then(resp => resp.json())
            .then(json => json.body)
    }
}

export default getRequestExecutor