'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function TestFirebase() {
  const [status, setStatus] = useState('Testing...');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log('Firebase auth object:', auth);
    setStatus('Firebase auth loaded: ' + (auth ? 'YES' : 'NO'));
    
    // Test creating a user
    const testAuth = async () => {
      try {
        const testEmail = `test${Date.now()}@example.com`;
        const testPassword = 'password123';
        
        console.log('Testing with:', testEmail);
        const result = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('Success! User:', result.user);
        setUser(result.user);
        setStatus('✅ Firebase auth WORKING! Created test user: ' + testEmail);
        
        // Clean up - delete test user
        await result.user.delete();
        console.log('Test user cleaned up');
      } catch (error: any) {
        console.error('Firebase test failed:', error);
        setStatus(`❌ Firebase error: ${error.code} - ${error.message}`);
      }
    };
    
    testAuth();
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 text-green-400">
      <h1 className="text-3xl font-bold mb-6">Firebase Test</h1>
      <div className="mb-6 p-4 border border-green-800 rounded">
        <div className="font-bold">Status:</div>
        <div className="text-green-300">{status}</div>
      </div>
      
      {user && (
        <div className="p-4 border border-green-700 rounded bg-green-950/30">
          <div className="font-bold">Test User Created:</div>
          <div>Email: {user.email}</div>
          <div>UID: {user.uid}</div>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Environment Variables Check:</h2>
        <div className="space-y-2 font-mono text-sm">
          <div>API Key exists: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌'}</div>
          <div>Auth Domain exists: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅' : '❌'}</div>
          <div>Project ID exists: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'}</div>
        </div>
      </div>
      
      <div className="mt-8">
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-green-800 text-green-300 rounded hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
