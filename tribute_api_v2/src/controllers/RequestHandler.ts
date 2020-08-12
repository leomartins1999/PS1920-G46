/*
  this file exports functions used to handle requests
*/

/**
 * handle request function
 * @param serviceFunction function which returns promise of operation result
 * @param res express response object
 * @param successStatusCode status code to be given on success
 * @param errorStatusCode status code to be given on error
 */
export function handleRequest(
    serviceFunction: () => Promise<any>,
    res,
    successStatusCode: number = 200,
    errorStatusCode: number = 400
) {
    try {
        serviceFunction()
            .then(result => handleSuccess(res, successStatusCode, result))
            .catch(err => handleError(res, errorStatusCode, err))
    } catch (e) {
        handleError(res, 500, e)
    }
}

/**
 * function used to format response object in case of success
 * @param res express response object
 * @param statusCode status code to be displayed
 * @param result body of response
 */
export function handleSuccess(res, statusCode, result) {
    // body
    const response = {
        status: "success",
        body: result
    };

    // status code and headers
    res.statusCode = statusCode;
    res.setHeader("content-type", "application/json ; charset=utf-8");

    // writing body
    res.end(JSON.stringify(response));
}

/**
 * function used to format response object in case of error
 * @param res express response object
 * @param statusCode status code to be displayed
 * @param error error object to be displayed
 */
export function handleError(res, statusCode, error) {
    // body
    const response = {
        status: "error",
        body: error
    };

    // status code and headers
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");

    // writing body
    res.end(JSON.stringify(response));
}