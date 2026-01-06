'use client';

import { useState, useEffect } from 'react';
import { saveToVault } from '@/lib/firebase/vaultService';
import { useAuth } from './AuthProvider';
import { FaTimes, FaTag, FaSave, FaExternalLinkAlt } from 'react-icons/fa';

interface AddToVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded?: () => void;
  documentData?: {
    title: string;
    description: string;
    source: string;
    sourceUrl: string;
    agency?: string;
    originalId?: string;
  };
}

type SourceType = 'data.gov' | 'archives.gov' | 'congress.gov' | 'state' | 'other';

export default function AddToVaultModal({ isOpen, onClose, onDocumentAdded, documentData }: AddToVaultModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState<SourceType>('data.gov');
  const [sourceUrl, setSourceUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [agency, setAgency] = useState('');

  // Initialize form with documentData if provided
  useEffect(() => {
    if (documentData) {
      setTitle(documentData.title);
      setDescription(documentData.description);
      setSourceUrl(documentData.sourceUrl);
      setAgency(documentData.agency || '');
      
      // Determine source from URL
      if (documentData.sourceUrl.includes('data.gov')) setSource('data.gov');
      else if (documentData.sourceUrl.includes('archives.gov')) setSource('archives.gov');
      else if (documentData.sourceUrl.includes('congress.gov')) setSource('congress.gov');
      else setSource('other');
    }
  }, [documentData]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to save to vault');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await saveToVault(user.uid, {
        title,
        description,
        source,
        sourceUrl,
        tags,
        notes,
        metadata: {
          agency: agency || undefined,
          originalId: documentData?.originalId
        }
      });

      if (result.success) {
        setSuccess(true);
        if (onDocumentAdded) {
          onDocumentAdded();
        }
        setTimeout(() => {
          onClose();
          setSuccess(false);
          resetForm();
        }, 1500);
      } else {
        setError('Failed to save document. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSource('data.gov');
    setSourceUrl('');
    setTags([]);
    setTagInput('');
    setNotes('');
    setAgency('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-green-800 bg-black">
        {/* Header */}
        <div className="border-b border-green-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-400">Save to Vault</h2>
              <p className="mt-1 text-green-600">Add this document to your personal collection</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-green-800 p-2 text-green-400 hover:bg-green-950/30"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="border-b border-green-700 bg-green-950/30 p-4">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <FaSave className="text-xl" />
              <span className="text-lg font-bold">Document saved to your vault!</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title & Source */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-green-300">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                  placeholder="Document title"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-green-300">Source</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as SourceType)}
                  className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                >
                  <option value="data.gov">Data.gov</option>
                  <option value="archives.gov">Archives.gov</option>
                  <option value="congress.gov">Congress.gov</option>
                  <option value="state">State Government</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-green-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                rows={3}
                placeholder="Brief description of this document"
                required
              />
            </div>

            {/* Source URL & Agency */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-green-300">
                  <FaExternalLinkAlt className="inline mr-2" />
                  Source URL *
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400 font-mono text-sm"
                  placeholder="https://..."
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-green-300">Agency/Department</label>
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                  placeholder="e.g., Department of Justice"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="mb-2 block text-sm font-medium text-green-300">
                <FaTag className="inline mr-2" />
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 rounded-full border border-green-700 bg-green-900/30 px-3 py-1 text-sm text-green-400"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-xs text-green-600 hover:text-green-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 rounded-lg border border-green-800 bg-black p-3 text-green-400"
                  placeholder="Add a tag (press Enter)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-lg border border-green-700 bg-green-900 px-4 text-green-400 hover:bg-green-800"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-green-300">Your Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-green-800 bg-black p-3 text-green-400"
                rows={3}
                placeholder="Add your personal notes, thoughts, or why you saved this..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-800 bg-red-950/30 p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-green-800 px-6 py-3 text-green-400 hover:bg-green-950/30"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || success}
                className="rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-8 py-3 font-bold text-green-300 hover:from-green-600 hover:to-green-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : success ? 'Saved!' : 'Save to Vault'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
