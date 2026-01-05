'use client'; // This needs to be a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ENTER SEARCH QUERY..."
          className="flex-1 bg-black p-3 font-mono text-green-400 outline-none border border-green-900"
        />
        <button 
          type="submit"
          className="border border-green-700 bg-green-900 px-6 py-3 text-green-300 hover:bg-green-800"
        >
          EXECUTE
        </button>
      </div>
      <div className="mt-2 text-sm text-green-600">
        &gt; Try: &quot;FEDERAL BUDGET 2024&quot; or &quot;DECLASSIFIED 1990&quot;
      </div>
    </form>
  );
}
