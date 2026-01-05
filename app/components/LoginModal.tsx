'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
}

export default function LoginModal({ isOpen, onClose, mode }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      console.error('Authentication error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Try logging in instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Check Firebase console.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Use at least 6 characters.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError(err.message || 'Authentication failed. Check console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl border border-green-800 bg-black p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-400">
              {mode === 'login' ? 'LOGIN TO VAULT' : 'REGISTER NEW USER'}
            </h2>
            <p className="mt-1 text-sm text-green-600">
              {mode === 'login' 
                ? 'Access your personal document vault' 
                : 'Create a new vault account'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-2xl text-green-600 hover:text-green-400"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-green-300">EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-green-800 bg-black p-3 text-green-400 outline-none focus:border-green-600"
              placeholder="test@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-green-300">PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-green-800 bg-black p-3 text-green-400 outline-none focus:border-green-600"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="rounded border border-red-800 bg-red-950/50 p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-green-700 to-green-800 py-3 font-medium text-green-300 hover:from-green-600 hover:to-green-700 disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
          </button>

          <p className="text-center text-sm text-green-600">
            {mode === 'login' ? (
              <>New user? <button type="button" onClick={() => {/* Switch to register mode */}} className="text-green-400 hover:underline">Register here</button></>
            ) : (
              <>Already have an account? <button type="button" onClick={() => {/* Switch to login mode */}} className="text-green-400 hover:underline">Login here</button></>
            )}
          </p>
        </form>
        
        <div className="mt-6 border-t border-green-900 pt-4">
          <p className="mb-2 text-xs text-green-800">For testing:</p>
          <div className="space-y-1 text-xs text-green-700">
            <div>Email: test@example.com</div>
            <div>Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
