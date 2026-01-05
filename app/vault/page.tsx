'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import LoginModal from "../components/LoginModal';""
import VaultDocumentCard from '@/app/components/VaultDocumentCard';
import AddToVaultModal from '@/app/components/AddToVaultModal';
import { getVaultDocuments, deleteVaultDocument, getVaultStats, VaultDocument } from '@/lib/firebase/vaultService';
import { FaPlus, FaSearch, FaFilter, FaChartBar, FaSync } from 'react-icons/fa';

export default function VaultPage() {
  const { user, loading: authLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<VaultDocument[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');

  // Load vault documents
  const loadVault = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load documents
      const docsResult = await getVaultDocuments(user.uid);
      if (docsResult.success) {
        setDocuments(docsResult.documents);
        setFilteredDocs(docsResult.documents);
      }

      // Load stats
      const statsResult = await getVaultStats(user.uid);
      if (statsResult.success) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error('Error loading vault:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (user) {
      loadVault();
    }
  }, [user]);

  // Filter documents when search or filter changes
  useEffect(() => {
    let filtered = documents;
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(term) ||
        doc.description.toLowerCase().includes(term) ||
        doc.tags.some(tag => tag.toLowerCase().includes(term)) ||
        doc.notes?.toLowerCase().includes(term)
      );
    }
    
    // Apply source filter
    if (selectedSource !== 'all') {
      filtered = filtered.filter(doc => doc.source === selectedSource);
    }
    
    setFilteredDocs(filtered);
  }, [searchTerm, selectedSource, documents]);

  const handleDelete = async (documentId: string) => {
    if (!user) return;
    
    const result = await deleteVaultDocument(user.uid, documentId);
    if (result.success) {
      setDocuments(docs => docs.filter(d => d.id !== documentId));
    }
  };

  const handleEdit = (document: VaultDocument) => {
    // We'll implement edit functionality next
    alert('Edit functionality coming soon!');
  };

  const getUniqueSources = () => {
    const sources = documents.map(doc => doc.source);
    return ['all', ...Array.from(new Set(sources))];
  };

  if (authLoading) {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4">
          <div className="mb-4">
            <span className="text-green-300">C:\VAULT\LOADING\</span>
            <span className="blink">_</span>
          </div>
          <div className="text-center py-12">
            <div className="text-green-600">LOADING VAULT...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4">
          <div className="mb-4">
            <span className="text-green-300">C:\VAULT\ACCESS\</span>
            <span className="blink">_</span>
          </div>
          
          <div className="mb-6 border border-green-900 p-6">
            <div className="text-green-600 mb-4">[AUTHENTICATION REQUIRED]</div>
            <div className="text-center py-8">
              <div className="text-xl text-green-300 mb-4">VAULT ACCESS DENIED</div>
              <p className="text-green-600 mb-6">
                You must be logged in to access your personal document vault.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="rounded-lg border border-green-800 bg-green-900 px-6 py-3 text-green-300 hover:bg-green-800"
                >
                  LOGIN TO CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
        <LoginModal 
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          mode="login"
        />
      </div>
    );
  }

  return (
    <div className="scanlines min-h-screen bg-gradient-to-b from-black to-gray-900 p-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-green-800/50 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Vault</h1>
              <p className="mt-1 text-green-400">Your personal government document collection</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-6 py-3 font-bold text-green-300 hover:from-green-600 hover:to-green-700"
            >
              <FaPlus />
              Add Document
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="mb-8 rounded-xl border border-green-800 bg-black/50 p-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{stats.totalDocuments}</div>
                <div className="text-sm text-green-600">Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stats.totalTags}</div>
                <div className="text-sm text-blue-600">Tags</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {Object.keys(stats.sources || {}).length}
                </div>
                <div className="text-sm text-purple-600">Sources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {new Date(stats.lastUpdated).toLocaleDateString()}
                </div>
                <div className="text-sm text-yellow-600">Last Updated</div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mb-8 rounded-xl border border-green-800 bg-black/50 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-green-300">
                <FaSearch />
                Search Your Vault
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                placeholder="Search by title, tags, or notes..."
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-green-300">
                <FaFilter />
                Filter by Source
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
              >
                {getUniqueSources().map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'All Sources' : source}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-green-600">
              Showing {filteredDocs.length} of {documents.length} documents
            </div>
            <button
              onClick={loadVault}
              className="flex items-center gap-2 rounded-lg border border-green-800 px-4 py-2 text-sm text-green-400 hover:bg-green-950/30"
            >
              <FaSync />
              Refresh
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-green-600">LOADING DOCUMENTS...</div>
          </div>
        ) : filteredDocs.length > 0 ? (
          <div className="space-y-4">
            {filteredDocs.map((doc) => (
              <VaultDocumentCard
                key={doc.id}
                document={doc}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-green-800 bg-black/50 p-12 text-center">
            <div className="text-5xl mb-4">🗄️</div>
            <h3 className="mb-2 text-xl font-bold text-white">Your Vault is Empty</h3>
            <p className="mb-6 text-green-600">
              {searchTerm || selectedSource !== 'all' 
                ? 'No documents match your search criteria'
                : 'Start adding documents to build your personal collection'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-8 py-3 font-bold text-green-300 hover:from-green-600 hover:to-green-700"
            >
              Add Your First Document
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        mode="login"
      />
      
      <AddToVaultModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
