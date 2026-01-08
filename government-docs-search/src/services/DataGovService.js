const axios = require('axios');
const { getSecret, apiKeys } = require('../config/secrets');

class DataGovService {
  constructor() {
    this.baseURL = 'https://api.data.gov';
    this.apiKey = null;
  }

  async initialize() {
    if (!this.apiKey) {
      this.apiKey = await getSecret(apiKeys.DATA_GOV);
    }
  }

  async search(query, options = {}) {
    await this.initialize();
    
    const params = {
      q: query,
      api_key: this.apiKey,
      per_page: options.perPage || 10,
      page: options.page || 1
    };

    try {
      const response = await axios.get(`${this.baseURL}/search`, { params });
      return this.formatResults(response.data);
    } catch (error) {
      console.error('Data.gov API Error:', error.message);
      return { error: 'Failed to fetch from Data.gov', results: [] };
    }
  }

  formatResults(data) {
    // Transform data.gov format to your unified format
    return {
      source: 'data.gov',
      total: data.metadata.total || 0,
      results: data.results.map(item => ({
        title: item.title,
        description: item.description,
        url: item.landingPage || item.accessURL,
        date: item.modified || item.issued,
        type: item.format || 'dataset',
        source: 'Data.gov'
      }))
    };
  }
}

module.exports = new DataGovService();

