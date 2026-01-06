
// lib/gov-apis/config.ts
import { GovApiEndpoint } from './types';

export const govApiEndpoints: GovApiEndpoint[] = [
  {
    id: 'trade-csl',
    name: 'USA Trade Consolidated Screening List',
    category: 'Trade',
    endpoint: 'https://api.trade.gov/v1/consolidated_screening_list/search',
    description: 'Access information on international trade from the US government.',
    requiresKey: true,
    apiKeyName: 'Subscription-Key',
    apiKeyLocation: 'header',
    searchKeywords: ['trade', 'commerce', 'exports', 'imports'],
    example: '/api/gov?action=endpoint&endpoint=trade-csl&params={"q":"John Doe"}',
  },
  {
    id: 'fcc-licenses',
    name: 'FCC Licenses',
    category: 'Technology',
    endpoint: 'https://data.fcc.gov/api/license-view/v1/licenses',
    description: 'Query and retrieve data from the FCC licensing database.',
    requiresKey: false,
    searchKeywords: ['fcc', 'licenses', 'telecom', 'radio'],
    example: '/api/gov?action=endpoint&endpoint=fcc-licenses&params={"licenseeName":"AT&T"}',
  },
  {
    id: 'usaspending-awards',
    name: 'USAspending Awards',
    category: 'Finance',
    endpoint: 'https://api.usaspending.gov/api/v2/search/spending_by_award/',
    description: 'Access data on federal government spending.',
    requiresKey: false,
    method: 'POST', // Specify POST method for this endpoint
    searchKeywords: ['spending', 'finance', 'budget', 'government contracts'],
    example: `/api/gov?action=endpoint&endpoint=usaspending-awards&params={
      "filters": {
        "award_type_codes": ["A", "B", "C", "D"],
        "time_period": [{ "start_date": "2023-01-01", "end_date": "2023-12-31" }]
      },
      "fields": ["Awarding Agency", "Award ID", "Recipient Name", "Total Obligation"],
      "limit": 10
    }`,
  },
  {
    id: 'fec-candidates',
    name: 'OpenFEC Candidates',
    category: 'Politics',
    endpoint: 'https://api.open.fec.gov/v1/candidates/search/',
    description: 'Access data on federal election campaigns, candidates, and committees.',
    requiresKey: true,
    apiKeyName: 'api_key',
    apiKeyLocation: 'query',
    searchKeywords: ['fec', 'elections', 'campaign finance', 'politics', 'candidates'],
    example: `/api/gov?action=endpoint&endpoint=fec-candidates&params={
      "q": "Biden",
      "api_key": "YOUR_FEC_API_KEY"
    }`,
  },
  {
    id: 'nrel-rates',
    name: 'NREL Utility Rates',
    category: 'Energy',
    endpoint: 'https://developer.nrel.gov/api/utility_rates/v3',
    description: 'Access data on renewable energy and energy efficiency.',
    requiresKey: true,
    apiKeyName: 'api_key',
    apiKeyLocation: 'query',
    searchKeywords: ['nrel', 'energy', 'renewable', 'solar', 'wind'],
    example: `/api/gov?action=endpoint&endpoint=nrel-rates&params={
      "address": "1600 Pennsylvania Ave NW, Washington, DC",
      "api_key": "YOUR_NREL_API_KEY"
    }`,
  },
];
