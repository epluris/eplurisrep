
import { SearchProvider } from './config';
import googleProvider from './providers/google';
import bingProvider from './providers/bing';
import { govApiService } from '@/lib/gov-apis';

const searchProviders: { [key: string]: SearchProvider } = {
  google: googleProvider,
  bing: bingProvider,
  gov: {
    search: (query: string) => govApiService.search(query, [])
  }
};

class SearchService {
  async search({ query, engine, numResults }: { query: string; engine: string; numResults: number }) {
    const provider = searchProviders[engine];
    if (!provider) {
      throw new Error(`Search engine "${engine}" not found`);
    }
    return provider.search(query, { numResults });
  }

  async searchAll({ query, numResults }: { query: string; numResults: number }) {
    const allResults = await Promise.all(
      Object.values(searchProviders).map(provider => 
        provider.search(query, { numResults }).catch(error => {
          console.error('Search provider failed:', error);
          return []; // Return empty array on failure
        })
      )
    );
    return allResults.flat();
  }
}

export const searchService = new SearchService();
