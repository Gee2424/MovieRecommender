const axios = require('axios');

const testOMDbAPI = async () => {
  try {
    // Replace with your actual OMDB API key
    const OMDB_API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7f427b92';
    const response = await axios.get(OMDB_API_URL);
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testOMDbAPI();
