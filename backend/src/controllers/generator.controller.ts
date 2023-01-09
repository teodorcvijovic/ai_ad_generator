import config from '../server'

const request = require("request");

export class GeneratorController {

    // function that invokes external OpenAPI and returns generated title
    generateTitle = async (req, res) => {

        // OpenAPI prompt
        let prompt = req.body.prompt

        // set the options for the request
        const options = {
            url: config.OPENAI_TEXT_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            json: {
                'model': config.OPENAI_MODEL,
                'prompt': prompt,
                'max_tokens': config.TITLE_MAX_TOKENS,
                'temperature': config.TEMPERATURE,
                'top_p': config.TOP_P,
                'frequency_penalty': 0,
                'presence_penalty': 0
            }
        };


        // send request to OpenAPI
        function sendRequest() {
            return new Promise((resolve, reject) => {
                request.post(
                    config.OPENAI_TEXT_URL,
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
                );
            })
        }

        const response: any = await sendRequest();

        return res.status(response.code).send(response.body)
    }
}