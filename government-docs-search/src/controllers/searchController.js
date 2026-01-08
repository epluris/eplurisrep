const DataGovService = require('../services/DataGovService');
const GovInfoService = require('../services/GovInfoService'); // You'll create this next

class SearchController {
  async unifiedSearch(req, res) {
    const { query, sources = 'all', limit = 20 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Define which sources to query
    const sourcesToQuery = sources === 'all' 
      ? ['dataGov', 'govInfo', 'congress'] 
      : sources.split(',');

    // Execute searches in parallel
    const searchPromises = [];
    
    if (sourcesToQuery.includes('dataGov')) {
      searchPromises.push(DataGovService.search(query, { perPage: limit }));
    }
    
    // Add other services as you create them
    // if (sourcesToQuery.includes('govInfo')) {
    //   searchPromises.push(GovInfoService.search(query, { limit }));
    // }

    try {
      const results = await Promise.allSettled(searchPromises);
      
      // Combine and format results
      const formattedResults = this.combineResults(results);
      
      // Optional: Store search in Firestore
      await this.logSearch(query, formattedResults.total);
      
      res.json(formattedResults);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ error: 'Search failed', details: error.message });
    }
  }

  combineResults(results) {
    const combined = {
      total: 0,
      results: [],
      sources: {}
    };

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value && !result.value.error) {
        combined.total += result.value.total || 0;
        combined.results.push(...result.value.results);
        combined.sources[result.value.source] = result.value.total || 0;
      }
    });

    // Sort by relevance (you can implement your own sorting logic)
    combined.results.sort((a, b) => {
      // Simple date-based sorting for now
      return new Date(b.date || 0) - new Date(a.date || 0);
    });

    return combined;
  }

  async logSearch(query, resultCount) {
    // Firestore integration will go here
    console.log(`Search logged: "${query}" returned ${resultCount} results`);
  }
}

module.exports = new SearchController();
