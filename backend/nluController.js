const axios = require('axios');

async function getNLUResponse(question, context) {
  const response = await axios.post('http://python-service:5000/nlu', {
    question,
    context,
  });
  return { answer: response.data.answer };
}

module.exports = { getNLUResponse };
