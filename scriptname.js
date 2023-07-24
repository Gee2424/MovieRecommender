const axios = require('axios');

const apiKey = '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';
const orgKey = 'org-EGJZWlIx7gniu8PICGRDPibZ';

const prompt = 'Translate the following English text to French: "{\\"text\\": \\"Hello, world!\\"}"';

async function getCompletionFromGPT3() {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 60
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Organization': `${orgKey}`
      }
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('Error:', error);
  }
}

getCompletionFromGPT3();
