const functions = require('firebase-functions');
const { getSecret } = require('./secrets');
const axios = require('axios'); // You'll need to install axios

exports.unifiedSearch = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const query = req.query.q; // Assume the search term is passed as 'q'

    // Retrieve API keys from Secret Manager
    const dataGovKey = await getSecret('data-gov-api-key');
    const govInfoKey = await getSecret('govinfo-api-key');
    // ... others

    // Make parallel requests to the government APIs
    const [dataGovResults, govInfoResults] = await Promise.all([
      searchDataGov(query, dataGovKey),
      searchGovInfo(query, govInfoKey),
      // ... other sources
    ]);

    // Combine and format the results
    const combinedResults = {
      dataGov: dataGovResults,
      govInfo: govInfoResults,
      // ... others
    };

    res.json(combinedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function searchDataGov(query, apiKey) {
  // Construct the URL for data.gov API
  const url = `https://api.data.gov/some/endpoint?q=${encodeURIComponent(query)}&api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
}

async function searchGovInfo(query, apiKey) {
  // Construct the URL for govinfo.gov API
  const url = `https://api.govinfo.gov/some/endpoint?query=${encodeURIComponent(query)}&api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
}