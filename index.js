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

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/test', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo! test')
})

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});