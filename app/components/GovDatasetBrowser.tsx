
'use client';

import { useState } from 'react';
import { govApiEndpoints } from '@/lib/gov-apis/config';
import { GovApiEndpoint } from '@/lib/gov-apis/types';

// ... (DatasetCard component remains the same)
interface DatasetCardProps {
  dataset: GovApiEndpoint;
  onSelect: (dataset: GovApiEndpoint) => void;
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
          <span className={`inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800`}>
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
  onDatasetSelect?: (dataset: GovApiEndpoint) => void;
}

interface DatasetData {
    success: boolean;
    data?: unknown;
    error?: string;
    dataset?: string;
    timestamp: Date;
  }

export default function GovDatasetBrowser({ onDatasetSelect }: GovDatasetBrowserProps) {
  const [datasets] = useState<GovApiEndpoint[]>(govApiEndpoints);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadingDataset, setLoadingDataset] = useState<string | null>(null);
  const [datasetData, setDatasetData] = useState<DatasetData | null>(null);

  const categories = ['all', ...new Set(govApiEndpoints.map(d => d.category))];

  const filteredDatasets = selectedCategory === 'all'
    ? datasets
    : datasets.filter(d => d.category === selectedCategory);

  const handleDatasetSelect = async (dataset: GovApiEndpoint) => {
    if (onDatasetSelect) {
      onDatasetSelect(dataset);
    }

    setLoadingDataset(dataset.name);
    setDatasetData(null); // Clear previous data

    try {
      // Extract params from the example URL
      const url = new URL(dataset.example, 'http://dummybase.com'); // Base URL is required for parsing
      const paramsStr = url.searchParams.get('params') || '{}';
      const params = JSON.parse(paramsStr);
      
      const response = await fetch(`/api/gov?action=endpoint&endpoint=${dataset.id}&params=${encodeURIComponent(JSON.stringify(params))}`);
      
      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.error || 'Failed to load dataset');
      }

      setDatasetData({ ...data, dataset: dataset.name, timestamp: new Date() });

    } catch (error: unknown) {
      console.error('Failed to load dataset:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setDatasetData({ success: false, error: message, dataset: dataset.name, timestamp: new Date() });
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
              key={dataset.id}
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
              <p className="mt-2 text-sm text-gray-600">Loading {loadingDataset}...</p>
            </div>
          ) : datasetData ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{datasetData.dataset}</h4>
                <p className="text-sm text-gray-600">
                  Loaded at: {new Date(datasetData.timestamp).toLocaleTimeString()}
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
              <p>Select a dataset to preview its data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
