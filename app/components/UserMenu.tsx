'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import LoginModal from './LoginModal';

export default function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    setModalMode('login');
    setIsModalOpen(true);
  };
  
  const handleRegisterClick = () => {
    setModalMode('register');
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged listener
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!user) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleLoginClick}
          className="rounded-lg border border-green-800 px-4 py-2 text-sm text-green-400 hover:bg-green-950/30"
        >
          LOGIN
        </button>
        <button
          onClick={handleRegisterClick}
          className="rounded-lg bg-gradient-to-r from-green-700 to-green-800 px-4 py-2 text-sm font-medium text-green-300 hover:from-green-600 hover:to-green-700"
        >
          REGISTER
        </button>
        <LoginModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          mode={modalMode}
          onModeSwitch={setModalMode}
        />
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
        <span className="text-sm text-green-300">{user.email?.split('@')[0]}</span>
        <FaCaretDown className="text-green-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-green-800 bg-black py-2">
          <div className="border-b border-green-900 px-4 py-2">
            <p className="text-xs text-green-600">Logged in as</p>
            <p className="truncate text-sm text-green-400">{user.email}</p>
          </div>
          <a 
            href="/vault"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-300 hover:bg-green-950/30"
          >
            My Vault
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-green-950/30"
          >
            <FaSignOutAlt />
            LOGOUT
          </button>
        </div>
      )}
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        mode={modalMode}
        onModeSwitch={setModalMode}
      />
    </div>
  );
}
