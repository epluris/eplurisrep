
import { govApiEndpoints } from './config';

class GovApiService {
  async getDataset(dataset: string, params: any) {
    console.log('Fetching dataset:', dataset, params);
    return {
      success: true,
      data: [],
      metadata: {},
      error: null,
    };
  }

  async search(query: string, sources: string[]) {
    console.log('Searching:', query, sources);
    return {
      success: true,
      data: [],
    };
  }

  getEndpoints() {
    return govApiEndpoints.map(ep => ({
      name: ep.name,
      category: ep.category,
      description: ep.description,
      requiresKey: ep.requiresKey,
      example: ep.example,
    }));
  }
}

export const govApiService = new GovApiService();
