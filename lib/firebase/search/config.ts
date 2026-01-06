// lib/search/config.ts
export const searchConfig = {
    // Google Custom Search
    google: {
      apiKey: process.env.GOOGLE_SEARCH_API_KEY || '',
      cseId: process.env.GOOGLE_CSE_ID || '',
      baseUrl: 'https://www.googleapis.com/customsearch/v1',
    },
  
    // Bing Search
    bing: {
      apiKey: process.env.BING_SEARCH_API_KEY || '',
      baseUrl: 'https://api.bing.microsoft.com/v7.0/search',
      safeSearch: 'Moderate' as const,
    },
  
    // Serper.dev (Google search alternative)
    serper: {
      apiKey: process.env.SERPER_API_KEY || '',
      baseUrl: 'https://google.serper.dev/search',
    },
  
    // Algolia
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || '',
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || '',
      indexName: process.env.ALGOLIA_INDEX_NAME || 'prod_docs',
    },
  
    // Optional: DuckDuckGo or Brave Search
    duckduckgo: {
      apiKey: process.env.DUCKDUCKGO_API_KEY || '',
      baseUrl: 'https://api.duckduckgo.com/',
    },
  
    // Add any other search engines here
  };
  
  export type SearchEngine = keyof typeof searchConfig;
  
  // Validate required configs
  export function validateSearchConfig() {
    const required = ['google', 'bing', 'serper'];
    const missing = required.filter(engine => 
      !searchConfig[engine as SearchEngine]?.apiKey
    );
    
    if (missing.length > 0) {
      console.warn(`Missing API keys for: ${missing.join(', ')}`);
    }
  }
  