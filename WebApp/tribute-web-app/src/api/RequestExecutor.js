export const API_BASE_PATH = "https://tribute-api.duckdns.org/api"

function getRequestExecutor() {
    return {
        get: get,
        post: post,
        put: put,
        delete: _delete,
        uploadImage: uploadImage
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

    function uploadImage(url, file){
        const formData = new FormData()

        formData.append('file', file)

        const options = {
            method: 'POST',
            mode: "cors",
            credentials: "include",
            body: formData
        }

        return fetch(`${API_BASE_PATH}${url}`, options)
            .then(resp => resp.json())
            .then(json => json.status === "error"? Promise.reject(json.body) : Promise.resolve(json.body))
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

        return fetch(`${API_BASE_PATH}${url}`, options)
            .catch(_ => Promise.reject("Error accessing platform."))
            .then(resp => resp.json())
            .then(json => {
                console.log("success")
                console.log(json)

                return json.status === "success"?
                    Promise.resolve(json.body) : Promise.reject(json.body.message)
            })
    }
}

export default getRequestExecutor