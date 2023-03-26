const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
    // Get the prompt from the request
    const { prompt } = req.body;

    // Generate a response with ChatGPT
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
});

app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});