// app/components/GovDatasetBrowser.tsx
'use client';

import { useState, useEffect } from 'react';
import { govApiEndpoints } from '@/lib/gov-apis/config';

interface DatasetCardProps {
  dataset: typeof govApiEndpoints[0];
  onSelect: (dataset: typeof govApiEndpoints[0]) => void;
}

function DatasetCard({ dataset, onSelect }: DatasetCardProps) {
  return (
    <div 
      onClick={() => onSelect(dataset)}
      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            dataset.category === 'CDC Data' ? 'bg-indigo-100 text-indigo-800' :
            dataset.category === 'Congress' ? 'bg-red-100 text-red-800' :
            dataset.category === 'Federal Register' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {dataset.category}
          </span>
        </div>
        {dataset.requiresKey && (
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
            API Key Required
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-600">{dataset.description}</p>
      {dataset.example && (
        <p className="mt-2 text-xs text-gray-400 truncate">
          Example: {dataset.example}
        </p>
      )}
    </div>
  );
}

interface GovDatasetBrowserProps {
  onDatasetSelect?: (dataset: typeof govApiEndpoints[0]) => void;
}

export default function GovDatasetBrowser({ onDatasetSelect }: GovDatasetBrowserProps) {
  const [datasets, setDatasets] = useState(govApiEndpoints);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadingDataset, setLoadingDataset] = useState<string | null>(null);
  const [datasetData, setDatasetData] = useState<any>(null);

  const categories = ['all', ...new Set(govApiEndpoints.map(d => d.category))];

  const filteredDatasets = selectedCategory === 'all'
    ? datasets
    : datasets.filter(d => d.category === selectedCategory);

  const handleDatasetSelect = async (dataset: typeof govApiEndpoints[0]) => {
    if (onDatasetSelect) {
      onDatasetSelect(dataset);
    }
    
    // Load dataset data
    setLoadingDataset(dataset.name);
    try {
      const response = await fetch(`/api/gov/dataset?name=${encodeURIComponent(dataset.name)}`);
      const data = await response.json();
      setDatasetData(data);
    } catch (error) {
      console.error('Failed to load dataset:', error);
    } finally {
      setLoadingDataset(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left sidebar - Categories and datasets */}
      <div className="lg:col-span-2 space-y-6">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dataset grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDatasets.map((dataset) => (
            <DatasetCard
              key={dataset.name}
              dataset={dataset}
              onSelect={handleDatasetSelect}
            />
          ))}
        </div>
      </div>

      {/* Right panel - Dataset preview */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-4">Dataset Preview</h3>
          
          {loadingDataset ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading dataset...</p>
            </div>
          ) : datasetData ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{datasetData.dataset}</h4>
                <p className="text-sm text-gray-600">
                  Loaded: {new Date(datasetData.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              {datasetData.success ? (
                <div className="max-h-96 overflow-y-auto">
                  <pre className="text-xs bg-white p-3 rounded border">
                    {JSON.stringify(datasetData.data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="p-3 bg-red-50 text-red-700 rounded">
                  <p className="font-medium">Error loading dataset</p>
                  <p className="text-sm">{datasetData.error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Select a dataset to preview data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
