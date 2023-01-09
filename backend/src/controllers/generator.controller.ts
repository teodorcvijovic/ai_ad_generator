import config from '../server'

const request = require("request");

export class GeneratorController {

    // function that invokes external OpenAPI and returns generated content
    generate = async (req, res) => {
        try{
            let responseBody = {
                title: '',
                content: '' 
            }

            // OpenAPI prompt
            let prompt = req.body.prompt

            /********************* generate title ******************/

            // response format: {code: ..., body: ...}
            let response:any = await this.generateText(prompt, config.TITLE_MAX_TOKENS)

            if (response.code != 200) {
                // error
                return res.status(response.code).send(response.body)
            }
            
            // parse the result from the response
            responseBody.title = response.body

            /********************* generate content ******************/

            // response format: {code: ..., body: ...}
            response = await this.generateText(prompt, config.CONTENT_MAX_TOKENS)

            if (response.code != 200) {
                // error
                return res.status(response.code).send(response.body)
            }
            
            // parse the result from the response
            responseBody.content = response.body

            /********************************************************/

            return res.send(responseBody)
        }
        catch(error) {
            console.log(error)
            return res.status(500).send({message: "Internal server error."})
        }
    }

    generateText = async (prompt, maxTokens) => {
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
        }


        // sends request to OpenAPI
        // response format: {code: ..., body: ...}
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
                        else {
                            // parse the result
                            body = body.choices[0].text
                        }
                        resolve({code, body})
                    }
                )
            })
        }

        const response: any = await sendRequest();
        return response
    }
}