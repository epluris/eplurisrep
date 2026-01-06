
// lib/gov-apis/config.ts
import { GovApiEndpoint } from './types';

export const govApiEndpoints: GovApiEndpoint[] = [
  {
    name: 'USA Trade API',
    category: 'Trade',
    endpoint: 'https://api.trade.gov/v1/consolidated_screening_list/search',
    description: 'Access information on international trade from the US government.',
    requiresKey: true,
    searchKeywords: ['trade', 'commerce', 'exports', 'imports'],
    example: '/api/gov?action=endpoint&endpoint=trade&params={"q":"John Doe"}',
  },
  {
    name: 'Federal Communications Commission (FCC) Licenses API',
    category: 'Technology',
    endpoint: 'https://data.fcc.gov/api/license-view/v1/licenses',
    description: 'Query and retrieve data from the FCC licensing database.',
    requiresKey: false,
    searchKeywords: ['fcc', 'licenses', 'telecom', 'radio'],
    example: '/api/gov?action=endpoint&endpoint=fcc&params={"licenseeName":"AT&T"}',
  },
  {
    name: 'USAspending API',
    category: 'Finance',
    endpoint: 'https://api.usaspending.gov/api/v2/search/spending_by_award/',
    description: 'Access data on federal government spending.',
    requiresKey: false,
    searchKeywords: ['spending', 'finance', 'budget', 'government contracts'],
    example: '/api/gov?action=endpoint&endpoint=usaspending&params={
      "filters": {
        "award_type_codes": ["A", "B", "C", "D"],
        "time_period": [{ "start_date": "2023-01-01", "end_date": "2023-12-31" }]
      },
      "fields": ["Awarding Agency", "Award ID", "Recipient Name", "Total Obligation"],
      "limit": 10
    }',
  },
  {
    name: 'OpenFEC API',
    category: 'Politics',
    endpoint: 'https://api.open.fec.gov/v1/candidates/search/',
    description: 'Access data on federal election campaigns, candidates, and committees.',
    requiresKey: true, // Requires an API key
    searchKeywords: ['fec', 'elections', 'campaign finance', 'politics', 'candidates'],
    example: '/api/gov?action=endpoint&endpoint=fec&params={
      "q": "Biden",
      "api_key": "YOUR_FEC_API_KEY"
    }',
  },
  {
    name: 'National Renewable Energy Laboratory (NREL) API',
    category: 'Energy',
    endpoint: 'https://developer.nrel.gov/api/utility_rates/v3',
    description: 'Access data on renewable energy and energy efficiency.',
    requiresKey: true, // Requires an API key
    searchKeywords: ['nrel', 'energy', 'renewable', 'solar', 'wind'],
    example: '/api/gov?action=endpoint&endpoint=nrel&params={
      "address": "1600 Pennsylvania Ave NW, Washington, DC",
      "api_key": "YOUR_NREL_API_KEY"
    }',
  },
];
