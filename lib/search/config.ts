
// lib/search/config.ts
export interface SearchProvider {
  name: string;
  fullName: string;
  website: string;
  supportsHistorical: boolean;
  search: (query: string, options: { numResults: number }) => Promise<{ success: boolean; results: any[] }>;
}

import googleProvider from './providers/google';
import bingProvider from './providers/bing';

export const searchProviders: { [key: string]: SearchProvider } = {
  google: googleProvider,
  bing: bingProvider,
};

export function validateSearchConfig() {
  if (!searchProviders || Object.keys(searchProviders).length === 0) {
    throw new Error("No search providers configured.");
  }
  console.log("Search config validated successfully.");
}
