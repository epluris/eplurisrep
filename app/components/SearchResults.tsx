interface SearchResultsProps {
    query: string;
  }
  
  export default async function SearchResults({ query }: SearchResultsProps) {
    // For now, we'll use mock data
    // In the next step, we'll connect to the real API
    
    const mockResults = [
      {
        id: 1,
        title: "Federal Budget FY 2024",
        source: "DATA.GOV",
        description: "Complete federal budget dataset for fiscal year 2024",
        url: "https://data.gov/dataset/federal-budget-2024",
        type: "Dataset"
      },
      {
        id: 2,
        title: "Congressional Voting Records 2023",
        source: "CONGRESS.GOV",
        description: "Roll call votes for the 118th Congress",
        url: "https://www.congress.gov/votes",
        type: "Legislation"
      },
      {
        id: 3,
        title: "Declassified CIA Documents 1990",
        source: "ARCHIVES.GOV",
        description: "Recently declassified intelligence reports",
        url: "https://www.archives.gov/declassification",
        type: "Declassified"
      },
      {
        id: 4,
        title: "Supreme Court Decisions 2023",
        source: "SUPREME.GOV",
        description: "All decisions from the 2023 term",
        url: "https://www.supremecourt.gov/opinions",
        type: "Legal"
      }
    ];
  
    return (
      <div className="space-y-3">
        {mockResults.map((result) => (
          <div key={result.id} className="border border-green-900 p-3 hover:bg-green-950">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-green-300">{result.title}</div>
                <div className="mt-1 text-sm text-green-600">{result.description}</div>
                <div className="mt-2 flex gap-4 text-xs">
                  <span className="text-green-500">SOURCE: {result.source}</span>
                  <span className="text-yellow-400">TYPE: {result.type}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="border border-green-700 bg-green-900 px-3 py-1 text-xs text-green-300 hover:bg-green-800">
                  VIEW
                </button>
                <button className="border border-blue-700 bg-blue-900 px-3 py-1 text-xs text-blue-300 hover:bg-blue-800">
                  SAVE TO VAULT
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 text-center text-green-600">
          [END OF RESULTS - 4 ITEMS FOUND]
        </div>
      </div>
    );
  }