
import { SearchProvider } from './config';
import googleProvider from './providers/google';
import bingProvider from './providers/bing';

const searchProviders: { [key: string]: SearchProvider } = {
  google: googleProvider,
  bing: bingProvider,
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
        provider.search(query, { numResults })
      )
    );
    return allResults.flat();
  }
}

export const searchService = new SearchService();
