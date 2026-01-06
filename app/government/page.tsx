// app/government/page.tsx
'use client';

import { useState } from 'react';
import GovSearchBox from '@/app/components/GovSearchBox';
import GovDatasetBrowser from '@/app/components/GovDatasetBrowser';

interface SearchResult {
  source: string;
  endpoint: string;
  data: any;
  metadata: any;
}

export default function GovernmentPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'datasets'>('search');

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setSearchError(null);
  };

  const handleSearchError = (error: string) => {
    setSearchError(error);
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">U.S. Government Data Explorer</h1>
          <p className="text-gray-600 mt-2">
            Search and explore official U.S. government documents, bills, and datasets
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'search'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'datasets'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Browse Datasets
          </button>
        </div>

        {/* Content */}
        {activeTab === 'search' ? (
          <div className="space-y-8">
            {/* Search Box */}
            <GovSearchBox
              onSearchResults={handleSearchResults}
              onSearchError={handleSearchError}
            />

            {/* Error Display */}
            {searchError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800">Search Error</h3>
                <p className="text-red-600">{searchError}</p>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Search Results ({searchResults.length} sources)
                </h2>
                
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-medium text-gray-900">{result.metadata.source}</span>
                        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          {result.metadata.endpoint}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {result.metadata.responseTime}ms
                      </span>
                    </div>
                    
                    {/* Display data based on source */}
                    {result.data && (
                      <div className="mt-4">
                        {Array.isArray(result.data) ? (
                          <div className="space-y-3">
                            {result.data.slice(0, 3).map((item: any, i: number) => (
                              <div key={i} className="p-3 bg-gray-50 rounded border">
                                <h4 className="font-medium text-gray-900">
                                  {item.title || item.name || 'Untitled'}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.description || item.snippet || 'No description'}
                                </p>
                                {item.url && (
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                  >
                                    View source →
                                  </a>
                                )}
                              </div>
                            ))}
                            {result.data.length > 3 && (
                              <p className="text-sm text-gray-500">
                                ... and {result.data.length - 3} more results
                              </p>
                            )}
                          </div>
                        ) : (
                          <pre className="text-sm bg-gray-50 p-3 rounded border overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <GovDatasetBrowser
            onDatasetSelect={(dataset) => {
              console.log('Selected dataset:', dataset);
              // You can implement dataset preview or loading here
            }}
          />
        )}

        {/* Info Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">About Government APIs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Congress.gov</h4>
              <p className="text-sm text-gray-600">
                Official source for U.S. federal legislative information. Includes bills, members, committees, and more.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Federal Register</h4>
              <p className="text-sm text-gray-600">
                Daily journal of the U.S. government with proposed and final rules, notices, and executive orders.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">GovInfo.gov</h4>
              <p className="text-sm text-gray-600">
                Provides free public access to official publications from all three branches of the Federal Government.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}