
// lib/gov-apis/types.ts
export interface GovApiEndpoint {
  id: string;
  name: string;
  category: string;
  endpoint: string;
  description: string;
  requiresKey: boolean;
  searchKeywords: string[];
  example: string;
  method?: 'GET' | 'POST';
  apiKeyName?: string;
  apiKeyLocation?: 'query' | 'header';
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}
