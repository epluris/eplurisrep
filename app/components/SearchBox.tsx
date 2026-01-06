// app/components/SearchBox.tsx
'use client';

import { useState } from 'react';

interface SearchBoxProps {
  onSearch?: (results: any[]) => void;
  placeholder?: string;
}

export default function SearchBox({ onSearch, placeholder = "Search the web..." }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState<'google' | 'bing' | 'serper' | 'all'>('google');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&engine=${engine}&all=${engine === 'all'}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      if (onSearch) {
        onSearch(data.results);
      }
      
      // Optional: Update URL for sharing
      const params = new URLSearchParams({
        q: query,
        engine,
      });
      window.history.pushState({}, '', `/search?${params.toString()}`);
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="engine"
              value="google"
              checked={engine === 'google'}
              onChange={(e) => setEngine(e.target.value as any)}
              className="text-blue-600"
            />
            <span>Google</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="engine"
              value="bing"
              checked={engine === 'bing'}
              onChange={(e) => setEngine(e.target.value as any)}
              className="text-blue-600"
            />
            <span>Bing</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="engine"
              value="serper"
              checked={engine === 'serper'}
              onChange={(e) => setEngine(e.target.value as any)}
              className="text-blue-600"
            />
            <span>Serper</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="engine"
              value="all"
              checked={engine === 'all'}
              onChange={(e) => setEngine(e.target.value as any)}
              className="text-blue-600"
            />
            <span>All Engines</span>
          </label>
        </div>
      </form>
    </div>
  );
}