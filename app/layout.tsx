'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./components/UserMenu";
import { 
  FaSearch, 
  FaDatabase, 
  FaUserLock, 
  FaProjectDiagram, 
  FaInfoCircle,
  FaHome 
} from "react-icons/fa";

export default function MenuBar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-green-800/50 bg-black/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">EP</span>
            </div>
            <div>
              <Link href="/" className="hover:opacity-80">
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-green-400">e</span>
                  <span className="text-white">Pluris</span>
                </h1>
                <p className="text-xs text-green-600">U.S. Government Data Portal</p>
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" icon={<FaHome />} text="Home" active={isActive('/') && pathname === '/'} />
            <NavLink href="/search" icon={<FaSearch />} text="Search" active={isActive('/search')} />
            <NavLink href="/browse" icon={<FaDatabase />} text="Browse" active={isActive('/browse')} />
            <NavLink href="/vault" icon={<FaUserLock />} text="My Vault" active={isActive('/vault')} />
            <NavLink href="/visualize" icon={<FaProjectDiagram />} text="Visualize" active={isActive('/visualize')} />
            <NavLink href="/mission" icon={<FaInfoCircle />} text="Mission" active={isActive('/mission')} />
          </nav>

          {/* User Menu + Mobile button */}
          <div className="flex items-center gap-4">
            <UserMenu />
            <button 
              className="rounded-lg border border-green-800 p-2 text-green-400 md:hidden"
              onClick={() => {/* We'll add mobile menu later */}}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ 
  href, 
  icon, 
  text, 
  active = false 
}: { 
  href: string; 
  icon: React.ReactNode; 
  text: string; 
  active?: boolean 
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all ${
        active 
          ? 'bg-green-900/30 text-green-400 border border-green-800' 
          : 'text-gray-400 hover:text-green-400 hover:bg-green-950/20'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}