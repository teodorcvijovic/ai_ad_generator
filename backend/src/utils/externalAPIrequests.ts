const request = require("request");

export class ExternalAPIRequests {

    // function that sends requests to OpenAPI
    // response format: {code: ..., body: ...}
    static sendPostRequest(url, options) {
        return new Promise((resolve, reject) => {
            request.post(
                url,
                options,
                // post callback
                function (error, response, body) {
                    let code = response.statusCode
                    if (code != 200) {
                        // error occured
                        body = body.error
                    }
                    resolve({code, body})
                }
            )
        })
    }
}