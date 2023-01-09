export class Configuration {

    OPENAI_API_KEY = process.env.OPENAI_API_KEY
    OPENAI_MODEL = process.env.OPENAI_MODEL
    OPENAI_TEXT_URL = process.env.OPENAI_TEXT_URL

    TEMPERATURE = 0.8
    TITLE_MAX_TOKENS = 7
    CONTENT_MAX_TOKENS = 50
    TOP_P = 1
}