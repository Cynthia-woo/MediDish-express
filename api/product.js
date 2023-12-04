//create an express app
const app = require('express')();

//import body-parser to parse json
const bodyParser = require('body-parser'); // Add this line to parse JSON
//provides utilities for working with file and directory paths
const path = require('path');
//import axios: a popular HTTP client to make requests
const axios = require('axios');
const express = require("express");


app.use(express.static('public'));

/**
 * GET product list
 *
 * @return product list | empty;
 * */

app.get("/",  (req, res) => {
    res.sendFile("index.html");
});

// app.get("/", async (req, res) => {
//     try {
//         res.json({
//             status: 200,
//             message: "Get data has successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Server error");
//     }
// })

// app.get('/api', (req, res) => {
//     const path = `/api/item/${v4()}`;
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//     res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// })
//
// app.get('/api/item/:slug', (req, res) => {
//     const { slug } = req.params;
//     res.end(`Item: ${slug}`);
// });

// Handle the API request
app.post("/api", async (req, res) => {
    try {
        const inputText = req.body.inputText;
        const user_id = req.body.user_id; // Optional user_id
        const session_id = req.body.session_id; // Optional session_id
        const stateful = req.body.stateful; // Optional stateful flag

        console.log('app/js-handler');

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

// Function to make the API call
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


module.exports = app;