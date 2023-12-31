//import express.js
const express = require('express');


//provides utilities for working with file and directory paths
const path = require("path");

//define express app
const app = express();

const cors = require('cors');
app.use(cors());

//import body-parser to parse json
const bodyParser = require('body-parser'); // Add this line to parse JSON
//import axios: a popular HTTP client to make requests
const axios = require('axios');

app.use(bodyParser.json()); // Use body-parser to parse JSON

//define port used in the project
const PORT = process.env.PORT || 5050;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})


//Handle the API request
app.post("/api", async (req, res) => {
    try {
        const inputText = req.body.inputText;
        const user_id = req.body.user_id; // Optional user_id
        const session_id = req.body.session_id; // Optional session_id
        const stateful = req.body.stateful; // Optional stateful flag

        const apiResponse = await callZeroWidthAPI(inputText, user_id, session_id, stateful);

        if (apiResponse && apiResponse.output_data && apiResponse.output_data.content) {
            const responseText = apiResponse.output_data.content;
            res.json({response: responseText});
        } else {
            console.error('Invalid API Response Format:', apiResponse);
            res.status(500).json({error: 'Invalid API response format'});
        }
    } catch (error) {
        console.error("Error in API request:", error);
        res.status(500).json({error: error.message});
    }
});

// Function to make the API call - Server
async function callZeroWidthAPI(inputText, user_id, session_id, stateful) {
    const apiUrl = "https://api.zerowidth.ai/process/NFkuStb1R0pe33kgs3IW/nFDVr95RfczyBCTiiOcu";
    const apiKey = "Bearer sk0w-8801efb57d18337bd57e8866f208052d";
    const requestBody = {
        data: {
            messages: [
                {
                    content: inputText,
                    role: "user",
                },
            ],
            variables: {
                "AGE_OF_USER": ""
            },
        },
        user_id: user_id, // Optional user_id
        session_id: session_id, // Optional session_id
        stateful: stateful || false, // Optional stateful flag (default to false)
    };

    try {
        console.log('Making API Request:', apiUrl, requestBody);
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json', // Include Content-Type header
            },
        });
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.message);
        return "API Error";
    }
}


//listen the reaction of the port
app.listen(PORT, () => console.log(`Server is running in port http://localhost:${PORT}`))

// index.js
module.exports = app

