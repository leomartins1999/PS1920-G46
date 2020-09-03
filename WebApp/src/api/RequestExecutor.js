//export const API_BASE_PATH = "http://localhost:8000/api"
export const API_BASE_PATH = "https://tribute-api.duckdns.org/api"

function getRequestExecutor() {
    return {
        get: get,
        post: post,
        put: put,
        delete: _delete,
        uploadImage: uploadImage
    }

    function readFile(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = e => {
                resolve(e.target.result)
            }

            reader.onerror = e => {
                reject(e)
            }

            reader.readAsDataURL(file)
        })
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

    async function uploadImage(url, file) {
        const body = {
            data: await readFile(file)
        }

        return put(url, body)
    }

    function executeRequest(method, url, body) {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            mode: "cors",
            credentials: "include"
        }

        if (body) options.body = JSON.stringify(body)

        return fetch(`${API_BASE_PATH}${url}`, options)
            .catch(_ => Promise.reject("Error accessing platform."))
            .then(resp => resp.json())
            .then(json => json.status === "success" ?
                Promise.resolve(json.body) :
                Promise.reject(json.body.message)
            )
    }
}

export default getRequestExecutor
