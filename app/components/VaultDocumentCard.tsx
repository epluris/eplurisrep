'use client';

import { useState } from 'react';
import { VaultDocument } from '@/lib/firebase/vaultService';
import { FaTag, FaExternalLinkAlt, FaTrash, FaEdit, FaFilePdf, FaDatabase, FaBook } from 'react-icons/fa';

interface VaultDocumentCardProps {
  document: VaultDocument;
  onDelete: (id: string) => void;
  onEdit: (document: VaultDocument) => void;
}

export default function VaultDocumentCard({ document, onDelete, onEdit }: VaultDocumentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getSourceIcon = () => {
    switch (document.source) {
      case 'data.gov': return <FaDatabase className="text-blue-400" />;
      case 'archives.gov': return <FaBook className="text-yellow-400" />;
      case 'congress.gov': return <FaFilePdf className="text-red-400" />;
      default: return <FaExternalLinkAlt className="text-green-400" />;
    }
  };

  const getSourceColor = () => {
    switch (document.source) {
      case 'data.gov': return 'border-blue-800 bg-blue-950/20';
      case 'archives.gov': return 'border-yellow-800 bg-yellow-950/20';
      case 'congress.gov': return 'border-red-800 bg-red-950/20';
      default: return 'border-green-800 bg-green-950/20';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this document from your vault?')) {
      setIsDeleting(true);
      onDelete(document.id!);
    }
  };

  return (
    <div className={`rounded-xl border p-4 ${getSourceColor()} transition-all hover:shadow-lg hover:shadow-green-900/10`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            {getSourceIcon()}
            <h3 className="font-bold text-white">{document.title}</h3>
          </div>
          
          <p className="mb-3 text-sm text-gray-400">{document.description}</p>
          
          {document.notes && (
            <div className="mb-3 rounded border border-green-900/50 bg-black/30 p-2">
              <div className="text-xs text-green-600">Your Notes:</div>
              <div className="text-sm text-gray-300">{document.notes}</div>
            </div>
          )}
          
          <div className="mb-3 flex flex-wrap gap-2">
            {document.tags.map((tag, index) => (
              <span 
                key={index} 
                className="flex items-center gap-1 rounded-full border border-green-900 bg-green-950/30 px-3 py-1 text-xs text-green-400"
              >
                <FaTag className="text-xs" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>Saved: {formatDate(document.savedAt)}</span>
              {document.metadata?.agency && (
                <span>Agency: {document.metadata.agency}</span>
              )}
            </div>
            <a 
              href={document.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:text-green-300"
            >
              View Source <FaExternalLinkAlt className="text-xs" />
            </a>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col gap-2">
          <button
            onClick={() => onEdit(document)}
            className="rounded-lg border border-green-800 p-2 text-green-400 hover:bg-green-950/30"
            title="Edit document"
          >
            <FaEdit />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-lg border border-red-800 p-2 text-red-400 hover:bg-red-950/30 disabled:opacity-50"
            title="Delete from vault"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
