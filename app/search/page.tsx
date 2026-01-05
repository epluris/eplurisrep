import SearchBox from "../components/SearchBox";
import SearchResults from "../components/SearchResults";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  
  return (
    <div className="scanlines min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Search Government Data</h1>
          <p className="mt-2 text-green-400">Search across all ePluris indexed sources</p>
        </div>
        
        {/* Main Search Area */}
        <div className="mb-8 rounded-xl border border-green-800 bg-black/50 p-6">
          <div className="mb-4">
            <span className="text-green-300">C:\SEARCH\QUERY\</span>
            <span className="blink">_</span>
          </div>
          <SearchBox />
        </div>
        
        {/* Show Results if Query Exists */}
        {query && (
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-green-600">SEARCH RESULTS FOR:</div>
                <div className="text-xl font-bold text-green-300">&quot;{query}&quot;</div>
              </div>
              <div className="text-sm text-green-600">
                Showing 4 sample results
              </div>
            </div>
            <SearchResults query={query} />
          </div>
        )}
        
        {/* Search Tips & Filters */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Search Filters */}
          <div className="rounded-xl border border-green-800 bg-black/50 p-6">
            <div className="mb-4 text-lg font-bold text-green-300">REFINE SEARCH</div>
            
            <div className="mb-6">
              <div className="mb-3 text-green-600">SOURCE TYPE</div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 accent-green-600" defaultChecked />
                  <span className="text-green-400">Data.gov</span>
                  <span className="ml-auto text-xs text-green-700">(376K+ datasets)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 accent-green-600" defaultChecked />
                  <span className="text-green-400">Archives.gov</span>
                  <span className="ml-auto text-xs text-green-700">(12M+ pages)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 accent-green-600" />
                  <span className="text-green-400">Congress.gov</span>
                  <span className="ml-auto text-xs text-green-700">(180K+ bills)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 accent-green-600" />
                  <span className="text-green-400">State Portals</span>
                  <span className="ml-auto text-xs text-green-700">(All 50 states)</span>
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-3 text-green-600">CONTENT TYPE</div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="contentType" className="mr-3 h-4 w-4 accent-green-600" defaultChecked />
                  <span className="text-green-400">Datasets & Statistics</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="contentType" className="mr-3 h-4 w-4 accent-green-600" />
                  <span className="text-green-400">Documents & Reports</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="contentType" className="mr-3 h-4 w-4 accent-green-600" />
                  <span className="text-green-400">Laws & Legislation</span>
                </label>
              </div>
            </div>
            
            <button className="w-full rounded-lg border border-green-700 bg-green-900/30 py-3 text-green-400 hover:bg-green-900/50">
              APPLY FILTERS
            </button>
          </div>
          
          {/* Search Tips */}
          <div className="rounded-xl border border-blue-800 bg-black/50 p-6">
            <div className="mb-4 text-lg font-bold text-blue-300">SEARCH TIPS</div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <div className="font-medium text-green-400">Use Specific Terms</div>
                <div className="text-sm text-gray-400">
                  Instead of &quot;budget&quot; try &quot;FY2024 federal budget Department of Defense&quot;
                </div>
              </div>
              
              <div className="border-l-4 border-blue-600 pl-4">
                <div className="font-medium text-blue-400">Include Agency Names</div>
                <div className="text-sm text-gray-400">
                  e.g., &quot;EPA climate change report 2023&quot; or &quot;FDA approval data&quot;
                </div>
              </div>
              
              <div className="border-l-4 border-purple-600 pl-4">
                <div className="font-medium text-purple-400">Search by Document Type</div>
                <div className="text-sm text-gray-400">
                  Try: &quot;declassified CIA memo&quot;, &quot;Supreme Court decision&quot;, &quot;committee hearing transcript&quot;
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-600 pl-4">
                <div className="font-medium text-yellow-400">Use Quotations for Exact Phrases</div>
                <div className="text-sm text-gray-400">
                  &quot;Affordable Care Act&quot; will find exact matches instead of individual words
                </div>
              </div>
            </div>
            
            <div className="mt-6 rounded-lg border border-blue-900 bg-blue-950/30 p-4">
              <div className="text-sm text-blue-400">Advanced Search Coming Soon</div>
              <div className="text-xs text-blue-700">
                Boolean operators, date ranges, and agency-specific search
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Searches */}
        <div className="mt-12 rounded-xl border border-green-800/30 bg-black/30 p-8">
          <h3 className="mb-6 text-center text-xl font-bold text-white">Popular Searches on ePluris</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <a 
              href="/search?q=covid+19+response+data" 
              className="rounded-lg border border-green-900 bg-green-950/20 p-4 text-center hover:border-green-700 hover:bg-green-950/40"
            >
              <div className="text-green-400">COVID-19 Data</div>
              <div className="text-xs text-green-700">CDC, HHS, state reports</div>
            </a>
            <a 
              href="/search?q=climate+change+reports" 
              className="rounded-lg border border-blue-900 bg-blue-950/20 p-4 text-center hover:border-blue-700 hover:bg-blue-950/40"
            >
              <div className="text-blue-400">Climate Reports</div>
              <div className="text-xs text-blue-700">EPA, NOAA, NASA data</div>
            </a>
            <a 
              href="/search?q=election+campaign+finance" 
              className="rounded-lg border border-purple-900 bg-purple-950/20 p-4 text-center hover:border-purple-700 hover:bg-purple-950/40"
            >
              <div className="text-purple-400">Campaign Finance</div>
              <div className="text-xs text-purple-700">FEC records, donations</div>
            </a>
            <a 
              href="/search?q=immigration+statistics" 
              className="rounded-lg border border-yellow-900 bg-yellow-950/20 p-4 text-center hover:border-yellow-700 hover:bg-yellow-950/40"
            >
              <div className="text-yellow-400">Immigration Data</div>
              <div className="text-xs text-yellow-700">DHS, USCIS, CBP</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
