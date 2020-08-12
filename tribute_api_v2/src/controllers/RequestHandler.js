"use strict";
/*
  this file exports functions used to handle requests
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * handle request function
 * @param serviceFunction function which returns promise of operation result
 * @param res express response object
 * @param successStatusCode status code to be given on success
 * @param errorStatusCode status code to be given on error
 */
function handleRequest(serviceFunction, res, successStatusCode, errorStatusCode) {
    if (successStatusCode === void 0) { successStatusCode = 200; }
    if (errorStatusCode === void 0) { errorStatusCode = 400; }
    try {
        serviceFunction()
            .then(function (result) { return handleSuccess(res, successStatusCode, result); })
            .catch(function (err) { return handleError(res, errorStatusCode, err); });
    }
    catch (e) {
        handleError(res, 500, e);
    }
}
exports.handleRequest = handleRequest;
/**
 * function used to format response object in case of success
 * @param res express response object
 * @param statusCode status code to be displayed
 * @param result body of response
 */
function handleSuccess(res, statusCode, result) {
    // body
    var response = {
        status: "success",
        body: result
    };
    // status code and headers
    res.statusCode = statusCode;
    res.setHeader("content-type", "application/json ; charset=utf-8");
    // writing body
    res.end(JSON.stringify(response));
}
exports.handleSuccess = handleSuccess;
/**
 * function used to format response object in case of error
 * @param res express response object
 * @param statusCode status code to be displayed
 * @param error error object to be displayed
 */
function handleError(res, statusCode, error) {
    // body
    var response = {
        status: "error",
        body: error
    };
    // status code and headers
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    // writing body
    res.end(JSON.stringify(response));
}
exports.handleError = handleError;
