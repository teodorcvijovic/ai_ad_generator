# AdOut
Simple AI assistant for generating content in advertising space. MEAN stack application depending on OpenAI API.
#
Express API
Endpoint | Method | Authentication | Request body | Response body | Description
--- | --- | --- | --- |--- | ---
`/generate` | POST | OpenAI API key | `"prompt": "..."` | `"title": "..."` <br> `"content": "..."` <br> `"images": ["...", ...]`(URLs) | Generates text and images <br> from user input prompt.
