
import { SearchProvider } from '../config';

const bingProvider: SearchProvider = {
  name: 'bing',
  fullName: 'Bing Custom Search',
  website: 'https://www.customsearch.ai/',
  supportsHistorical: false,
  search: async (query: string) => {
    // In a real implementation, you would make an API call to Bing Custom Search
    console.log(`Searching Bing for: ${query}`);
    return {
      success: true,
      results: [],
    };
  },
};

export default bingProvider;
