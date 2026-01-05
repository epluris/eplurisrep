'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';

export default function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for user
    const savedUser = localStorage.getItem('epluris_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = () => {
    const email = prompt('Enter email (local test):', 'test@example.com');
    if (email) {
      localStorage.setItem('epluris_user', email);
      setUser(email);
      window.location.reload(); // Refresh to show vault
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('epluris_user');
    setUser(null);
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleLogin}
          className="rounded-lg border border-green-800 px-4 py-2 text-sm text-green-400 hover:bg-green-950/30"
        >
          LOGIN (TEST)
        </button>
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
        <span className="text-sm text-green-300">{user.split('@')[0]}</span>
        <FaCaretDown className="text-green-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-green-800 bg-black py-2">
          <div className="border-b border-green-900 px-4 py-2">
            <p className="text-xs text-green-600">Logged in as</p>
            <p className="truncate text-sm text-green-400">{user}</p>
            <p className="text-xs text-green-800 mt-1">(Local test mode)</p>
          </div>
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
