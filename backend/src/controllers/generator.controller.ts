import config from '../server'
import { ExternalAPIRequests } from '../utils/externalAPIrequests'

export class GeneratorController {

    // function that invokes external OpenAPI and returns generated content
    generate = async (req, res) => {
        try{
            let responseBody = {
                title: '',
                content: '', 
                images: []
            }

            // OpenAPI prompt
            let prompt = req.body.prompt

            /********************* generate title ******************/

            let response:any = await this.generateText(prompt, config.TITLE_MAX_TOKENS)

            if (response.code != 200) {
                // error
                return res.status(response.code).send(response.body)
            }
            
            // get the result from the response
            responseBody.title = response.body

            /********************* generate content ******************/

            response = await this.generateText(prompt, config.CONTENT_MAX_TOKENS)

            if (response.code != 200) {
                // error
                return res.status(response.code).send(response.body)
            }
            
            // parse the result from the response
            responseBody.content = response.body

            /********************* generate images *******************/
            
            response = await this.generateImages(prompt, config.NUM_OF_IMAGES, config.IMAGE_WIDTH)

            if (response.code != 200) {
                // error
                return res.status(response.code).send(response.body)
            }
            
            // get the result from the response
            responseBody.images = response.body

            /*********************************************************/

            return res.send(responseBody)
        }
        catch(error) {
            console.log(error)
            return res.status(500).send({message: "Internal server error."})
        }
    }

    // method should return generated text
    // response format: {code: ..., body: ...}
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

        // send request to OpenAPI
        // response format: {code: ..., body: ...}
        const response: any = await ExternalAPIRequests.sendPostRequest(config.OPENAI_TEXT_URL, options);

        if (response.code == 200) {
            // parse result
            response.body = response.body.choices[0].text
        }

        return response
    }

    // method should return list of urls of generated images
    generateImages = async (prompt, numOfImages, imageWidth) => {
        // set the options for the request
        const options = {
            url: config.OPENAI_IMAGE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            json: {
                'prompt': prompt,
                'n': numOfImages,
                'size': `${imageWidth}x${imageWidth}` 
            }
        }


        // sends request to OpenAPI
        // response format: {code: ..., body: ...}
        const response: any = await ExternalAPIRequests.sendPostRequest(config.OPENAI_IMAGE_URL, options)

        if (response.code == 200) {
            // parse result
            let result = []
            response.body.data.forEach(imageJSON => {
                result.push(imageJSON.url)
            });
            response.body = result
        }

        return response
    }

    
}