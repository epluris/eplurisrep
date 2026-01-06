// lib/gov-apis/config.ts
export const govApiConfig = {
    // Congress.gov API (Data.gov legislative branch)
    congress: {
      baseUrl: 'https://api.congress.gov/v3',
      apiKey: process.env.CONGRESS_GOV_API_KEY || '', // Get from https://api.congress.gov/sign-up
      rateLimit: '1000 requests per hour',
    },
  
    // Federal Register API
    federalRegister: {
      baseUrl: 'https://www.federalregister.gov/api/v1',
      apiKey: process.env.FEDERAL_REGISTER_API_KEY || '', // Optional but recommended
      rateLimit: '1000 requests per hour',
    },
  
    // GovInfo.gov API
    govInfo: {
      baseUrl: 'https://api.govinfo.gov',
      apiKey: process.env.GOVINFO_API_KEY || '', // Required
      rateLimit: '1000 requests per day',
    },
  
    // Data.gov APIs (various datasets)
    dataGov: {
      baseUrl: 'https://data.cdc.gov',
      otherSources: {
        usitc: 'https://www.usitc.gov',
        transportation: 'https://data.transportation.gov',
        catalog: 'https://catalog.data.gov',
      },
      // Most Data.gov APIs don't require keys
    },
  
    // National Archives API
    nationalArchives: {
      baseUrl: 'https://catalog.archives.gov/api/v2',
      apiKey: process.env.NATIONAL_ARCHIVES_API_KEY || '', // Usually not required
      rateLimit: 'Unlimited (public API)',
    },
  };
  
  export interface GovApiEndpoint {
    name: string;
    category: string;
    description: string;
    endpoint: string;
    method: 'GET' | 'POST';
    requiresKey: boolean;
    parameters?: Record<string, any>;
    example?: string;
  }
  
  export const govApiEndpoints: GovApiEndpoint[] = [
    // Congress.gov endpoints
    {
      name: 'Bills Search',
      category: 'Congress',
      description: 'Search and retrieve bills from the U.S. Congress',
      endpoint: '/bill',
      method: 'GET',
      requiresKey: false,
      parameters: {
        format: 'json',
        fromDateTime: '2024-01-01T00:00:00Z',
        toDateTime: '2024-12-31T23:59:59Z',
        congress: '118',
        billType: ['hr', 's', 'hjres', 'sjres'],
        limit: 20,
        offset: 0,
      },
      example: 'https://api.congress.gov/v3/bill?format=json&limit=20&offset=0',
    },
    {
      name: 'Members of Congress',
      category: 'Congress',
      description: 'Get information about current and historical members',
      endpoint: '/member',
      method: 'GET',
      requiresKey: false,
      parameters: {
        format: 'json',
        congress: '118',
        chamber: ['house', 'senate'],
      },
      example: 'https://api.congress.gov/v3/member?format=json&congress=118',
    },
  
    // Federal Register endpoints
    {
      name: 'Documents Facets',
      category: 'Federal Register',
      description: 'Get document counts by daily, weekly, monthly, or quarterly facets',
      endpoint: '/documents/facets/{facet}',
      method: 'GET',
      requiresKey: false,
      parameters: {
        facet: 'daily', // Can be: daily, weekly, monthly, quarterly
      },
      example: 'https://www.federalregister.gov/api/v1/documents/facets/daily',
    },
  
    // GovInfo.gov endpoints
    {
      name: 'Content Search',
      category: 'GovInfo',
      description: 'Search across all GovInfo collections',
      endpoint: '/search',
      method: 'POST',
      requiresKey: true,
      parameters: {
        query: 'Federal documents',
        pageSize: 10,
        offsetMark: '*',
        sorts: [{ field: 'relevancy', sortOrder: 'DESC' }],
        historical: true,
        resultLevel: 'default',
      },
      example: 'https://api.govinfo.gov/search',
    },
    {
      name: 'Collections',
      category: 'GovInfo',
      description: 'Get list of available collections',
      endpoint: '/collections',
      method: 'GET',
      requiresKey: true,
      example: 'https://api.govinfo.gov/collections',
    },
  
    // Data.gov datasets
    {
      name: 'Drug Overdose Death Rates',
      category: 'CDC Data',
      description: 'CDC Wonder data on drug overdose death rates',
      endpoint: 'https://data.cdc.gov/api/views/95ax-ymtc/rows.json',
      method: 'GET',
      requiresKey: false,
    },
    {
      name: '2026 Harmonized Tariff Schedule',
      category: 'USITC Data',
      description: 'Harmonized Tariff Schedule of the United States',
      endpoint: 'https://www.usitc.gov/sites/default/files/tata/hts/hts_2026_basic_edition_json.json',
      method: 'GET',
      requiresKey: false,
    },
    {
      name: 'Border Crossing Entry Data',
      category: 'Transportation Data',
      description: 'Border crossing/entry data',
      endpoint: 'https://data.transportation.gov/api/views/keg4-3bc2/rows.json',
      method: 'GET',
      requiresKey: false,
    },
  
    // National Archives
    {
      name: 'Online Availability',
      category: 'National Archives',
      description: 'Check online availability of records',
      endpoint: '/online-availability',
      method: 'GET',
      requiresKey: false,
    },
    {
      name: 'Records Statistics',
      category: 'National Archives',
      description: 'Get statistics about records',
      endpoint: '/records/stats',
      method: 'GET',
      requiresKey: false,
    },
  ];