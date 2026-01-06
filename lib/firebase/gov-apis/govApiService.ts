// lib/gov-apis/govApiService.ts
import { govApiConfig, govApiEndpoints, GovApiEndpoint } from './config';

export interface GovApiRequest {
  endpointName: string;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
}

export interface GovApiResponse {
  success: boolean;
  data: any;
  metadata: {
    source: string;
    endpoint: string;
    timestamp: string;
    responseTime: number;
    rateLimitRemaining?: number;
  };
  error?: string;
}

export class GovApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async makeRequest(request: GovApiRequest): Promise<GovApiResponse> {
    const startTime = Date.now();
    const endpoint = govApiEndpoints.find(e => e.name === request.endpointName);
    
    if (!endpoint) {
      throw new Error(`Endpoint ${request.endpointName} not found`);
    }

    // Check cache first
    const cacheKey = this.getCacheKey(endpoint, request.params);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return {
        success: true,
        data: cached.data,
        metadata: {
          source: endpoint.category,
          endpoint: endpoint.name,
          timestamp: new Date().toISOString(),
          responseTime: 0,
          cached: true,
        },
      };
    }

    try {
      // Construct URL
      let url = this.constructUrl(endpoint, request.params);
      
      // Prepare headers
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'User-Agent': 'GovernmentSearchApp/1.0',
      };

      // Add API key if required
      const apiKey = this.getApiKey(endpoint.category);
      if (apiKey) {
        if (endpoint.category === 'GovInfo') {
          headers['X-Api-Key'] = apiKey;
        } else if (endpoint.category === 'Congress') {
          // Congress.gov API key goes in URL
          url += `&api_key=${apiKey}`;
        }
      }

      // Make request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), request.timeout || 30000);

      const response = await fetch(url, {
        method: endpoint.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Check for rate limiting
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;

      // Cache successful response
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return {
        success: true,
        data,
        metadata: {
          source: endpoint.category,
          endpoint: endpoint.name,
          timestamp: new Date().toISOString(),
          responseTime,
          rateLimitRemaining: rateLimitRemaining ? parseInt(rateLimitRemaining) : undefined,
        },
      };

    } catch (error: any) {
      return {
        success: false,
        data: null,
        metadata: {
          source: endpoint.category,
          endpoint: endpoint.name,
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        },
        error: error.message,
      };
    }
  }

  /**
   * Search across multiple government APIs
   */
  async searchAcrossApis(query: string, categories?: string[]) {
    const searchableEndpoints = govApiEndpoints.filter(endpoint => {
      if (categories && categories.length > 0) {
        return categories.includes(endpoint.category);
      }
      return true;
    });

    const promises = searchableEndpoints.map(async (endpoint) => {
      try {
        let params = {};
        
        // Adjust parameters based on endpoint type
        if (endpoint.category === 'GovInfo') {
          return this.makeRequest({
            endpointName: 'Content Search',
            body: {
              query,
              pageSize: 5,
              offsetMark: '*',
              sorts: [{ field: 'relevancy', sortOrder: 'DESC' }],
            },
          });
        } else if (endpoint.category === 'Congress') {
          params = { ...params, q: query };
        }
        
        // For other endpoints, we'll need to modify the request
        // This is a simplified example
        return this.makeRequest({
          endpointName: endpoint.name,
          params: { ...endpoint.parameters, q: query },
        });
      } catch (error) {
        return {
          success: false,
          data: null,
          metadata: { source: endpoint.category, endpoint: endpoint.name },
          error: error.message,
        };
      }
    });

    const results = await Promise.all(promises);
    return results.filter(r => r.success);
  }

  /**
   * Get dataset from Data.gov
   */
  async getDataset(datasetName: string, params?: Record<string, any>) {
    const endpoint = govApiEndpoints.find(e => e.name === datasetName);
    
    if (!endpoint) {
      throw new Error(`Dataset ${datasetName} not found`);
    }

    return this.makeRequest({
      endpointName: datasetName,
      params,
    });
  }

  private constructUrl(endpoint: GovApiEndpoint, params?: Record<string, any>): string {
    let url = endpoint.endpoint;
    
    // Replace path parameters
    if (params) {
      Object.keys(params).forEach(key => {
        if (url.includes(`{${key}}`)) {
          url = url.replace(`{${key}}`, params[key]);
        }
      });
    }

    // Add base URL for relative endpoints
    if (!url.startsWith('http')) {
      const category = endpoint.category.toLowerCase().replace(/\s/g, '');
      const categoryKey = category as keyof typeof govApiConfig;
      
      if (govApiConfig[categoryKey]) {
        url = govApiConfig[categoryKey].baseUrl + url;
      }
    }

    // Add query parameters
    if (params && Object.keys(params).length > 0) {
      const urlObj = new URL(url);
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => urlObj.searchParams.append(key, v.toString()));
        } else if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, value.toString());
        }
      });
      url = urlObj.toString();
    }

    return url;
  }

  private getApiKey(category: string): string | null {
    const categoryKey = category.toLowerCase().replace(/\s/g, '') as keyof typeof govApiConfig;
    return govApiConfig[categoryKey]?.apiKey || null;
  }

  private getCacheKey(endpoint: GovApiEndpoint, params?: Record<string, any>): string {
    return `${endpoint.name}:${JSON.stringify(params || {})}`;
  }

  // Clear cache (useful for testing or when data needs to be fresh)
  clearCache() {
    this.cache.clear();
  }
}

export const govApiService = new GovApiService();
