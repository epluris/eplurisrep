import { useMemo } from 'react';

interface SearchResultsProps {
  query: string;
}

// A mock search result item
interface SearchResultItem {
  id: number;
  title: string;
  source: 'DATA.GOV' | 'CONGRESS.GOV' | 'ARCHIVES.GOV' | 'SUPREME.GOV';
  description: string;
  url: string;
  type: string;
  agency: string;
  date: string;
  tags: string[];
}

export default function SearchResults({ query }: SearchResultsProps) {
  const mockResults: SearchResultItem[] = useMemo(() => [
    // ... same mock data as before
    {
        id: 1,
        title: "Federal Budget FY 2024",
        source: "DATA.GOV",
        description: "Complete federal budget dataset for fiscal year 2024, including department allocations",
        url: "https://data.gov/dataset/federal-budget-2024",
        type: "Dataset",
        agency: "Office of Management and Budget",
        date: "2024-01-15",
        tags: ["budget", "federal", "spending", "omb"]
      },
      {
        id: 2,
        title: "Congressional Voting Records 2023",
        source: "CONGRESS.GOV",
        description: "Roll call votes for the 118th Congress, all House and Senate votes",
        url: "https://www.congress.gov/votes",
        type: "Legislation",
        agency: "U.S. Congress",
        date: "2023-12-31",
        tags: ["congress", "voting", "roll-call", "legislative"]
      },
      {
        id: 3,
        title: "Declassified CIA Documents 1990-1995",
        source: "ARCHIVES.GOV",
        description: "Recently declassified intelligence reports and assessments",
        url: "https://www.archives.gov/declassification",
        type: "Declassified",
        agency: "Central Intelligence Agency",
        date: "2023-11-20",
        tags: ["cia", "declassified", "intelligence", "cold-war"]
      },
      {
        id: 4,
        title: "Supreme Court Decisions 2023 Term",
        source: "SUPREME.GOV",
        description: "All written decisions and opinions from the 2023 Supreme Court term",
        url: "https://www.supremecourt.gov/opinions",
        type: "Legal",
        agency: "Supreme Court of the United States",
        date: "2023-10-01",
        tags: ["supreme-court", "legal", "decisions", "judicial"]
      }
  ], []);

  const filteredResults = useMemo(() => {
    if (!query) return mockResults;

    const lowercasedQuery = query.toLowerCase();
    return mockResults.filter(result => 
      result.title.toLowerCase().includes(lowercasedQuery) ||
      result.description.toLowerCase().includes(lowercasedQuery) ||
      result.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
    );
  }, [query, mockResults]);

  return (
    <div className="space-y-4">
      {filteredResults.map((result) => (
        <div key={result.id} className="rounded-xl border border-green-800 bg-black/30 p-6 transition-all hover:border-green-700 hover:bg-black/50">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-block h-3 w-3 rounded-full ${
                  result.source === 'DATA.GOV' ? 'bg-green-500' :
                  result.source === 'ARCHIVES.GOV' ? 'bg-yellow-500' :
                  result.source === 'CONGRESS.GOV' ? 'bg-red-500' : 'bg-blue-500'
                }`}></span>
                <span className="text-sm font-mono text-green-400">{result.source}</span>
                <span className="text-xs text-green-700">• {result.type}</span>
              </div>
              
              <h3 className="mb-2 text-lg font-bold text-white">{result.title}</h3>
              <p className="mb-3 text-gray-400">{result.description}</p>
              
              <div className="mb-4 flex flex-wrap gap-2">
                {result.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="rounded-full border border-green-900 bg-green-950/30 px-3 py-1 text-xs text-green-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="text-green-600">Agency:</span>
                  <span className="text-gray-400">{result.agency}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-green-600">Date:</span>
                  <span className="text-gray-400">{result.date}</span>
                </span>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 hover:underline"
                >
                  View Original Source →
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 min-w-[140px]">
              <button className="w-full rounded-lg border border-green-700 bg-green-900/30 px-4 py-2 text-green-400 hover:bg-green-900/50">
                VIEW DETAILS
              </button>
              <button className="w-full rounded-lg border border-blue-700 bg-blue-900/30 px-4 py-2 text-blue-400 hover:bg-blue-900/50">
                SAVE TO VAULT
              </button>
              <button className="w-full rounded-lg border border-gray-700 bg-gray-900/30 px-4 py-2 text-gray-400 hover:bg-gray-900/50">
                SHARE
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Results Summary */}
      <div className="mt-6 rounded-lg border border-green-900 bg-green-950/20 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-green-400">Search Results Summary</div>
            <div className="text-sm text-green-700">
              Showing {filteredResults.length} sample results for &quot;{query}&quot;. Real ePluris search coming soon.
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{filteredResults.length}</div>
              <div className="text-xs text-green-700">Results</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{new Set(filteredResults.map(r => r.source)).size}</div>
              <div className="text-xs text-blue-700">Sources</div>
            </div>
            <button className="rounded-lg border border-green-800 bg-green-950/30 px-6 py-2 text-green-400 hover:bg-green-900/30">
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
