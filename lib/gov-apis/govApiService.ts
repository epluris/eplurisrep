import { govApiEndpoints } from './config';
import { GovApiEndpoint, SearchResult } from './types';

class GovApiService {
  async getDataset(datasetId: string, params: Record<string, unknown>) {
    const endpoint = govApiEndpoints.find(ep => ep.id === datasetId);

    if (!endpoint) {
      throw new Error(`Dataset with id "${datasetId}" not found`);
    }

    const apiKey = process.env.GOV_API_KEY;
    if (endpoint.requiresKey && !apiKey) {
      throw new Error(`Dataset "${endpoint.name}" requires an API key. Please set the GOV_API_KEY environment variable.`);
    }

    if (params.api_key) {
      delete params.api_key;
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    const requestOptions: RequestInit = { headers };
    const url = new URL(endpoint.endpoint);

    if (endpoint.method === 'POST') {
      requestOptions.method = 'POST';
      headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(params);
    } else {
      requestOptions.method = 'GET';
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) {
          continue;
        }

        if (Array.isArray(value)) {
          value.forEach(v => url.searchParams.append(key, String(v)));
        } else if (typeof value === 'object') {
          url.searchParams.append(key, JSON.stringify(value));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    }

    if (endpoint.requiresKey && apiKey) {
      if (endpoint.apiKeyLocation === 'header' && endpoint.apiKeyName) {
        headers[endpoint.apiKeyName] = apiKey;
      } else if (endpoint.apiKeyLocation === 'query' && endpoint.apiKeyName) {
        url.searchParams.append(endpoint.apiKeyName, apiKey);
      }
    }

    const response = await fetch(url.toString(), requestOptions);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch data from ${endpoint.name}: ${response.statusText} - ${errorBody}`);
    }

    try {
      const data = await response.json();
      return this.transformResults(data, endpoint);
    } catch {
      throw new Error(`Failed to parse JSON response from ${endpoint.name}`);
    }
  }

  async search(query: string, sources: string[]): Promise<SearchResult[]> {
    let endpointsToSearch = govApiEndpoints;
    if (sources && sources.length > 0) {
        endpointsToSearch = govApiEndpoints.filter(ep => 
            sources.some(s => ep.searchKeywords.includes(s) || ep.id.includes(s))
        );
    }

    const searchPromises = endpointsToSearch.map(endpoint => 
      this.getDataset(endpoint.id, { q: query }).catch(error => {
        console.error(`Error searching ${endpoint.name}:`, error);
        return []; // Return empty array on error to not fail the whole search
      })
    );

    const results = await Promise.all(searchPromises);
    return results.flat();
  }

  private transformResults(data: any, endpoint: GovApiEndpoint): SearchResult[] {
    // This is a flexible transformer. You may need to add more specific transformers for new endpoints.
    const items = data.results || data.data || (Array.isArray(data) ? data : []);
    if (!Array.isArray(items)) return [];

    return items.map((item: any) => ({
        title: item.title || item.name || item.fullName || 'No title',
        link: item.url || item.website || (item.id ? `${endpoint.endpoint}/${item.id}` : endpoint.endpoint),
        snippet: item.description || item.summary || item.details || 'No snippet available',
        source: endpoint.name,
    }));
  }

  getEndpoints() {
    return govApiEndpoints.map(ep => ({ ...ep }));
  }
}

export const govApiService = new GovApiService();
