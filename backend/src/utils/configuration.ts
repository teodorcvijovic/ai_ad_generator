export class Configuration {

    OPENAI_API_KEY = process.env.OPENAI_API_KEY
    OPENAI_MODEL = process.env.OPENAI_MODEL
    OPENAI_TEXT_URL = process.env.OPENAI_TEXT_URL

    TEMPERATURE = 0.8
    TITLE_MAX_TOKENS = 32
    TOP_P = 1
}