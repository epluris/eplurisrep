// app/components/GovSearchBox.tsx
'use client';

import { useState } from 'react';

export interface SearchResult {
    title: string;
    description: string;
    url: string;
    source: string;
    agency?: string;
    date?: string;
  }

interface GovSearchBoxProps {
  onSearchResults?: (results: SearchResult[]) => void;
  onSearchError?: (error: string) => void;
}

const categories = [
  { id: 'all', name: 'All Sources', color: 'bg-blue-100 text-blue-800' },
  { id: 'Congress', name: 'Congress', color: 'bg-red-100 text-red-800' },
  { id: 'Federal Register', name: 'Federal Register', color: 'bg-green-100 text-green-800' },
  { id: 'GovInfo', name: 'GovInfo', color: 'bg-purple-100 text-purple-800' },
  { id: 'National Archives', name: 'National Archives', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'CDC Data', name: 'CDC Data', color: 'bg-indigo-100 text-indigo-800' },
];

export default function GovSearchBox({ onSearchResults, onSearchError }: GovSearchBoxProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories.filter(id => id !== 'all'), categoryId];
      
      if (newCategories.length === 0) {
        setSelectedCategories(['all']);
      } else {
        setSelectedCategories(newCategories);
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        action: 'search',
        q: query,
      });
      
      if (!selectedCategories.includes('all')) {
        params.append('category', selectedCategories.join(','));
      }
      
      const response = await fetch(`/api/gov?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (data.success && onSearchResults) {
        onSearchResults(data.data);
      } else if (data.error && onSearchError) {
        onSearchError(data.error);
      }
      
    } catch (error: unknown) {
      console.error('Government search error:', error);
      if (onSearchError) {
        const message = error instanceof Error ? error.message : 'Search failed';
        onSearchError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search government documents, bills, datasets..."
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Category Filters */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Search Sources:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategories.includes(category.id)
                    ? `${category.color} ring-2 ring-offset-2 ring-opacity-50`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Examples */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {['healthcare bill', 'immigration policy', 'economic data', 'COVID statistics'].map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setQuery(example);
                  // Auto-search if you want
                  // handleSearch(new Event('submit') as any);
                }}
                className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
