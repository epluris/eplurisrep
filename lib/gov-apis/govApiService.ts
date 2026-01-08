import { govApiEndpoints } from './config';
import { GovApiEndpoint, SearchResult } from './types';

class GovApiService {
  async getDataset(datasetId: string, params: Record<string, unknown>) {
    const endpoint = govApiEndpoints.find(ep => ep.id === datasetId);
    if (!endpoint) {
      throw new Error(`Dataset with ID "${datasetId}" not found.`);
    }

    const url = new URL(endpoint.endpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === 'string') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch dataset: ${response.statusText}`);
    }

    return await response.json();
  }

  async search(query: string, sources: string[]): Promise<SearchResult[]> {
    // In a real implementation, you would make API calls to the selected sources.
    // For now, we just return some mock data.
    console.log(`Searching for "${query}" in sources: ${sources.join(', ')}`);
    return [
      {
        title: `Mock result for "${query}" from ${sources[0]}`, 
        url: 'https://example.com',
        snippet: `This is a mock search result for the query "${query}".`
      }
    ];
  }
}

export const govApiService = new GovApiService();
