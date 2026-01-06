import { govApiEndpoints } from './config';

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
      return {
        success: true,
        dataset: endpoint.name,
        data,
      };
    } catch {
      throw new Error(`Failed to parse JSON response from ${endpoint.name}`);
    }
  }

  async search(query: string, sources: string[]) {
    console.log('Searching:', query, sources);
    return {
      success: true,
      data: [],
    };
  }

  getEndpoints() {
    return govApiEndpoints.map(ep => ({ ...ep }));
  }
}

export const govApiService = new GovApiService();
