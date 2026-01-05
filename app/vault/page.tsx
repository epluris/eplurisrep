'use client';

import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

export default function VaultPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-green-300">C:\VAULT\LOADING\</span>
            <span className="blink">_</span>
          </div>
          <div className="text-center py-8 border border-green-800/50 bg-black/30">
            <div className="text-green-500 text-xl">LOADING VAULT...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4 max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="text-red-500">C:\VAULT\ACCESS_DENIED</span>
            <span className="blink">_</span>
          </div>
          
          <div className="border border-red-800/50 bg-red-950/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">AUTHENTICATION REQUIRED</h2>
            <p className="text-gray-300 mb-6">
              You must be logged in to access your personal document vault. Please log in to continue.
            </p>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-8 py-3 text-lg font-bold text-white hover:from-green-600 hover:to-green-700 transition-all"
            >
              Go to Login Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated - show their vault
  return (
    <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
      <div className="border border-green-800 p-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-green-300">C:\VAULT\USER\{user.email?.split('@')[0]}\</span>
          <span className="blink">_</span>
        </div>
        
        <div className="mb-6 border border-green-900 bg-black/30 p-3">
          <div className="text-green-600">[VAULT DASHBOARD]</div>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>USER:</span>
              <span className="text-green-300">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span>DOCUMENTS STORED:</span>
              <span className="text-green-300">0</span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL TAGS:</span>
              <span className="text-green-300">0</span>
            </div>
          </div>
        </div>

        {/* Vault content will go here */}
        <div className="border border-green-900 bg-black/30 p-4">
          <div className="text-green-600 mb-4">[YOUR SAVED DOCUMENTS]</div>
          <div className="text-center py-8 text-green-700">
            No documents saved yet. Start searching and saving!
          </div>
        </div>
      </div>
    </div>
  );
}