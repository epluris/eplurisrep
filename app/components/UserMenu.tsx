'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { FaUser, FaSignOutAlt, FaCaretDown, FaBox } from 'react-icons/fa';
import Link from 'next/link';

export default function UserMenu() {
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-green-800 px-4 py-2">
        <div className="text-sm text-green-600">LOADING...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link
          href="/login"
          className="rounded-lg border border-green-800 px-4 py-2 text-sm text-green-400 hover:bg-green-950/30"
        >
          LOGIN
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-4 py-2 text-sm text-green-300 hover:from-green-600 hover:to-green-700"
        >
          REGISTER
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 rounded-lg border border-green-800 bg-green-950/20 px-4 py-2 hover:bg-green-950/40"
      >
        <FaUser className="text-green-400" />
        <span className="text-sm text-green-300">
          {user.email?.split('@')[0] || 'USER'}
        </span>
        <FaCaretDown className="text-green-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-green-800 bg-black py-2">
          <div className="border-b border-green-900 px-4 py-2">
            <p className="text-xs text-green-600">Logged in as</p>
            <p className="truncate text-sm text-green-400">{user.email}</p>
          </div>
          <Link
            href="/vault"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-950/30"
          >
            <FaBox />
            My Vault
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-green-950/30"
          >
            <FaSignOutAlt />
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
}
