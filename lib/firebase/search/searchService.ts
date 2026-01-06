// lib/search/searchService.ts
import { searchConfig, SearchEngine } from './config';

export interface SearchResult {
  id: string;
  title: string;
  link: string;
  snippet: string;
  source: SearchEngine;
  thumbnail?: string;
  displayLink?: string;
}

export interface SearchParams {
  query: string;
  engine?: SearchEngine;
  numResults?: number;
  safeSearch?: boolean;
  language?: string;
}

export class SearchService {
  /**
   * Search using a specific engine
   */
  async search(params: SearchParams): Promise<SearchResult[]> {
    const engine = params.engine || 'google';
    
    switch (engine) {
      case 'google':
        return this.searchGoogle(params);
      case 'bing':
        return this.searchBing(params);
      case 'serper':
        return this.searchSerper(params);
      case 'algolia':
        return this.searchAlgolia(params);
      default:
        throw new Error(`Unsupported search engine: ${engine}`);
    }
  }

  /**
   * Search multiple engines and combine results
   */
  async searchAll(params: Omit<SearchParams, 'engine'>): Promise<SearchResult[]> {
    const engines: SearchEngine[] = ['google', 'bing', 'serper'];
    
    const promises = engines.map(engine =>
      this.search({ ...params, engine }).catch(() => [])
    );
    
    const results = await Promise.all(promises);
    return this.mergeAndRankResults(results.flat());
  }

  /**
   * Google Custom Search API
   */
  private async searchGoogle(params: SearchParams): Promise<SearchResult[]> {
    const { apiKey, cseId, baseUrl } = searchConfig.google;
    
    if (!apiKey || !cseId) {
      throw new Error('Google Search API key or CSE ID not configured');
    }

    const url = new URL(baseUrl);
    url.searchParams.append('key', apiKey);
    url.searchParams.append('cx', cseId);
    url.searchParams.append('q', params.query);
    url.searchParams.append('num', String(params.numResults || 10));
    url.searchParams.append('safe', params.safeSearch ? 'active' : 'off');
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Google Search API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.items?.map((item: any, index: number) => ({
      id: `google_${index}_${Date.now()}`,
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: 'google' as const,
      thumbnail: item.pagemap?.cse_image?.[0]?.src || item.pagemap?.cse_thumbnail?.[0]?.src,
      displayLink: item.displayLink,
    })) || [];
  }

  /**
   * Bing Search API
   */
  private async searchBing(params: SearchParams): Promise<SearchResult[]> {
    const { apiKey, baseUrl } = searchConfig.bing;
    
    if (!apiKey) {
      throw new Error('Bing Search API key not configured');
    }

    const response = await fetch(`${baseUrl}?q=${encodeURIComponent(params.query)}&count=${params.numResults || 10}&mkt=${params.language || 'en-US'}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Bing Search API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.webPages?.value?.map((item: any, index: number) => ({
      id: `bing_${index}_${Date.now()}`,
      title: item.name,
      link: item.url,
      snippet: item.snippet,
      source: 'bing' as const,
      thumbnail: item.thumbnailUrl,
      displayLink: item.displayUrl,
    })) || [];
  }

  /**
   * Serper.dev API (Google search alternative)
   */
  private async searchSerper(params: SearchParams): Promise<SearchResult[]> {
    const { apiKey, baseUrl } = searchConfig.serper;
    
    if (!apiKey) {
      throw new Error('Serper API key not configured');
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: params.query,
        num: params.numResults || 10,
      }),
    });

    if (!response.ok) {
      throw new Error(`Serper API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.organic?.map((item: any, index: number) => ({
      id: `serper_${index}_${Date.now()}`,
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: 'serper' as const,
    })) || [];
  }

  /**
   * Algolia Search
   */
  private async searchAlgolia(params: SearchParams): Promise<SearchResult[]> {
    const { appId, apiKey, indexName } = searchConfig.algolia;
    
    if (!appId || !apiKey) {
      throw new Error('Algolia credentials not configured');
    }

    // Algolia JavaScript client needs to be loaded in browser
    // This is a simplified version - you might want to use the Algolia client
    const response = await fetch(
      `https://${appId}-dsn.algolia.net/1/indexes/${indexName}/query`,
      {
        method: 'POST',
        headers: {
          'X-Algolia-Application-Id': appId,
          'X-Algolia-API-Key': apiKey,
        },
        body: JSON.stringify({
          query: params.query,
          hitsPerPage: params.numResults || 10,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Algolia API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.hits?.map((item: any, index: number) => ({
      id: `algolia_${item.objectID || index}`,
      title: item.title || item.name || '',
      link: item.url || item.link || '',
      snippet: item._highlightResult?.content?.value || item.description || '',
      source: 'algolia' as const,
    })) || [];
  }

  /**
   * Merge and rank results from multiple engines
   */
  private mergeAndRankResults(results: SearchResult[]): SearchResult[] {
    // Remove duplicates based on URL
    const seen = new Set<string>();
    const uniqueResults = results.filter(result => {
      const key = result.link.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Simple ranking: prioritize Google, then Bing, then others
    const enginePriority: Record<SearchEngine, number> = {
      google: 3,
      bing: 2,
      serper: 1,
      algolia: 1,
      duckduckgo: 0,
    };

    return uniqueResults.sort((a, b) => {
      // Higher priority engines first
      const priorityDiff = enginePriority[b.source] - enginePriority[a.source];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Fallback: sort by title length (shorter titles often more relevant)
      return a.title.length - b.title.length;
    });
  }
}

export const searchService = new SearchService();
