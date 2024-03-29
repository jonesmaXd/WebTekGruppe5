import {getCookie} from "./cookies";

// Import REST API BASE URL from the environment variable, see .env file
// Note: all environment variables must start with REACT_, otherwise React will not handle them!
const API_BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * Send a REST-API request to the backend
 * @param method The method to use: GET, POST, PUT, DELETE
 * @param url relative URL of the API endpoint
 * @param callback Callback function to call on success, with response data (JSON-decoded) as the parameter
 * @param requestBody When supplied, send this data in the request body. Does not work with HTTP GET!
 * @param errorCallback A function called when the response code is not 200. Two parameters will be passed
 * to the function: HTTP response code and response body (as text)
 */
export function sendApiRequest(method, url, callback, requestBody, errorCallback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let responseJson = "";
                if (request.responseText) {
                    responseJson = JSON.parse(request.responseText);
                }
                callback(responseJson);
            } else if (errorCallback) {
                errorCallback(request.status, request.responseText);
            } else {
                console.error("Error in API request");
            }
        }
    };

    const fullUrl = API_BASE_URL + url;
    request.open(method, fullUrl);

    // Set JWT token, if it is stored in a cookie
    const jwtToken = getCookie("jwt");
    if (jwtToken) {
        request.setRequestHeader("Authorization", "Bearer " + jwtToken);
    }

    // Do we need to include data in the request?
    if (requestBody) {
        if (method.toLowerCase() !== "get") {
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(requestBody));
        } else {
            console.error("Trying to send request data with HTTP GET, not allowed!")
            request.send();
        }
    } else {
        request.send();
    }
}