const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const GPT_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Replace with your GPT API URL
const OMDB_API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=7f427b92'; // Replace with your actual OMDB API key

// Middleware to parse request body
app.use(bodyParser.json());

// Define a route to handle user input prompts and send them to the GPT API
app.post('/generate-response', async (req, res) => {
  try {
    const { prompt } = req.body; // Assuming prompt is sent in the request body

    // Send the prompt to the GPT API using Axios
    const response = await axios.post(GPT_API_URL, {
      prompt: prompt
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers or authentication tokens for the GPT API
        // Replace 'YOUR_API_KEY' with your actual API key
        'Authorization': 'Bearer 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'
      }
    });

    const generatedResponse = response.data.choices[0].text; // Extract the generated response

    // Send the generated response back to the frontend
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Define a route to receive suggested queries from the frontend
app.post('/retrieve-movies', async (req, res) => {
  try {
    const { query } = req.body; // Assuming query is sent in the request body

    // Send the query to the OMDB API using Axios
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
    const movieData = response.data.Search || []; // Extract the movie data from the 'Search' property

    // Send the movie data back to the frontend
    res.json({ movies: movieData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Define a route to send the movie data back to the GPT API for analysis
app.post('/generate-recommendations', async (req, res) => {
  try {
    const { movieData } = req.body; // Assuming movieData is sent in the request body

    // Send the movieData to the GPT API for analysis using Axios
    const response = await axios.post(GPT_API_URL, {
      movieData: movieData
    }, {
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers or authentication tokens for the GPT API
        // Replace 'YOUR_API_KEY' with your actual API key
        'Authorization': 'api key'
      }
    });

    const recommendations = response.data.recommendations; // Extract the generated recommendations
    const explanations = response.data.explanations; // Extract the generated explanations

    // Send the recommendations and explanations back to the frontend
    res.json({ recommendations: recommendations, explanations: explanations });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Serve the static files (index.html, main.js, styles.css)
app.use(express.static('public'));

// Handle all other routes and return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
