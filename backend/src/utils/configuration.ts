export class Configuration {

    OPENAI_API_KEY = process.env.OPENAI_API_KEY

    // text generation params
    OPENAI_MODEL = process.env.OPENAI_MODEL
    OPENAI_TEXT_URL = process.env.OPENAI_TEXT_URL
    TEMPERATURE = 0.8
    TITLE_MAX_TOKENS = 7
    CONTENT_MAX_TOKENS = 50
    TOP_P = 1

    // image generation params
    OPENAI_IMAGE_URL = process.env.OPENAI_IMAGE_URL
    NUM_OF_IMAGES = 5
    IMAGE_WIDTH = 256 // note that width can only be 256, 512 or 1024
}