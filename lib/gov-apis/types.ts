
// lib/gov-apis/types.ts
export interface GovApiEndpoint {
  name: string;
  category: string;
  endpoint: string;
  description: string;
  requiresKey: boolean;
  searchKeywords: string[];
  example: string;
}
