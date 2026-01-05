import Link from "next/link";
import SearchBox from "./components/SearchBox";
import UserMenu from "./components/UserMenu";
import { FaSearch, FaDatabase, FaUserLock, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="scanlines min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Modern Menu Bar */}
      <header className="sticky top-0 z-50 border-b border-green-800/50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <span className="font-bold text-white">EPU</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-green-400">E</span>
                  <span className="text-white"> PLURIBUS</span>
                  <span className="text-blue-400"> UNUM</span>
                </h1>
                <p className="text-xs text-green-600">U.S. Government Data Portal</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" icon={<FaSearch />} text="Search" active />
              <NavLink href="/browse" icon={<FaDatabase />} text="Browse" />
              <NavLink href="/vault" icon={<FaUserLock />} text="My Vault" />
              <NavLink href="/visualize" icon={<FaProjectDiagram />} text="Visualize" />
              <NavLink href="/mission" icon={<FaInfoCircle />} text="Mission" />
            </nav>

            {/* User Menu + Mobile button */}
            <div className="flex items-center gap-4">
              <UserMenu />
              <button className="rounded-lg border border-green-800 p-2 text-green-400 md:hidden">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Clear Mission */}
        <div className="mb-12 rounded-xl border border-green-800/50 bg-gradient-to-r from-black to-gray-900/50 p-8 glow">
          <div className="max-w-3xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-green-400">&gt;</span>
              <span className="text-sm text-green-600">MISSION STATEMENT</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Simplifying Government Data Access for{" "}
              <span className="text-green-400">Every American</span>
            </h2>
            <p className="mb-6 text-lg text-gray-300 leading-relaxed">
              No more hunting through dozens of websites. E Pluribus Unum aggregates, organizes, 
              and makes searchable all public U.S. government data—federal, state, and local—into 
              one centralized, non-partisan portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg border border-green-800 bg-green-950/30 p-4">
                <div className="text-green-400">✓ One Search</div>
                <div className="text-sm text-gray-400">All government databases</div>
              </div>
              <div className="rounded-lg border border-blue-800 bg-blue-950/30 p-4">
                <div className="text-blue-400">✓ Personal Vault</div>
                <div className="text-sm text-gray-400">Save & organize documents</div>
              </div>
              <div className="rounded-lg border border-purple-800 bg-purple-950/30 p-4">
                <div className="text-purple-400">✓ No Politics</div>
                <div className="text-sm text-gray-400">Raw data only, no spin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-transparent"></div>
            <h3 className="text-2xl font-bold text-white">Search All Government Data</h3>
            <div className="h-1 flex-1 bg-gradient-to-l from-green-600 to-transparent"></div>
          </div>
          
          <div className="rounded-xl border border-green-800 bg-black/50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-green-400">C:\SEARCH\</span>
              <span className="blink">_</span>
            </div>
            <SearchBox />
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <QuickLink href="/search?q=federal+budget" label="Federal Budget" />
              <QuickLink href="/search?q=congress+votes" label="Congress Votes" />
              <QuickLink href="/search?q=declassified" label="Declassified Docs" />
              <QuickLink href="/search?q=state+laws" label="State Laws" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Unified Search"
            description="One search across Data.gov, Archives.gov, Congress.gov, and state portals"
            icon="🔍"
            color="green"
          />
          <FeatureCard
            title="Personal Vault"
            description="Save documents, add custom tags, create visual connections between data"
            icon="🗄️"
            color="blue"
          />
          <FeatureCard
            title="Visual Government"
            description="Interactive org charts showing federal & state government structure"
            icon="📊"
            color="purple"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-green-800/30 bg-black/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-2 text-xl font-bold text-white">
                E PLURIBUS UNUM
              </div>
              <p className="max-w-md text-sm text-gray-400">
                Making U.S. government data accessible, searchable, and understandable for every citizen.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Privacy</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Sources</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Contact</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">GitHub</a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-green-800">
            © 2024 E Pluribus Unum. An independent public service project.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function NavLink({ href, icon, text, active = false }: { 
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

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-green-900 p-3 text-center hover:bg-green-950/30 hover:border-green-700 transition-all"
    >
      <div className="text-green-400">{label}</div>
    </Link>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  color: 'green' | 'blue' | 'purple' 
}) {
  const colors = {
    green: 'border-green-800 bg-green-950/20',
    blue: 'border-blue-800 bg-blue-950/20',
    purple: 'border-purple-800 bg-purple-950/20'
  };

  const textColors = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  };

  return (
    <div className={`rounded-xl border p-6 ${colors[color]} transition-all hover:glow`}>
      <div className="mb-4 text-3xl">{icon}</div>
      <h4 className={`mb-2 text-xl font-bold ${textColors[color]}`}>{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}import Link from "next/link";
import SearchBox from "./components/SearchBox";
import UserMenu from "./components/UserMenu";
import { FaSearch, FaDatabase, FaUserLock, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="scanlines min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Modern Menu Bar */}
      <header className="sticky top-0 z-50 border-b border-green-800/50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <span className="font-bold text-white">EPU</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-green-400">E</span>
                  <span className="text-white"> PLURIBUS</span>
                  <span className="text-blue-400"> UNUM</span>
                </h1>
                <p className="text-xs text-green-600">U.S. Government Data Portal</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" icon={<FaSearch />} text="Search" active />
              <NavLink href="/browse" icon={<FaDatabase />} text="Browse" />
              <NavLink href="/vault" icon={<FaUserLock />} text="My Vault" />
              <NavLink href="/visualize" icon={<FaProjectDiagram />} text="Visualize" />
              <NavLink href="/mission" icon={<FaInfoCircle />} text="Mission" />
            </nav>

            {/* User Menu + Mobile button */}
            <div className="flex items-center gap-4">
              <UserMenu />
              <button className="rounded-lg border border-green-800 p-2 text-green-400 md:hidden">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Clear Mission */}
        <div className="mb-12 rounded-xl border border-green-800/50 bg-gradient-to-r from-black to-gray-900/50 p-8 glow">
          <div className="max-w-3xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-green-400">&gt;</span>
              <span className="text-sm text-green-600">MISSION STATEMENT</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Simplifying Government Data Access for{" "}
              <span className="text-green-400">Every American</span>
            </h2>
            <p className="mb-6 text-lg text-gray-300 leading-relaxed">
              No more hunting through dozens of websites. E Pluribus Unum aggregates, organizes, 
              and makes searchable all public U.S. government data—federal, state, and local—into 
              one centralized, non-partisan portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg border border-green-800 bg-green-950/30 p-4">
                <div className="text-green-400">✓ One Search</div>
                <div className="text-sm text-gray-400">All government databases</div>
              </div>
              <div className="rounded-lg border border-blue-800 bg-blue-950/30 p-4">
                <div className="text-blue-400">✓ Personal Vault</div>
                <div className="text-sm text-gray-400">Save & organize documents</div>
              </div>
              <div className="rounded-lg border border-purple-800 bg-purple-950/30 p-4">
                <div className="text-purple-400">✓ No Politics</div>
                <div className="text-sm text-gray-400">Raw data only, no spin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1 flex-1 bg-gradient-to-r from-green-600 to-transparent"></div>
            <h3 className="text-2xl font-bold text-white">Search All Government Data</h3>
            <div className="h-1 flex-1 bg-gradient-to-l from-green-600 to-transparent"></div>
          </div>
          
          <div className="rounded-xl border border-green-800 bg-black/50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-green-400">C:\SEARCH\</span>
              <span className="blink">_</span>
            </div>
            <SearchBox />
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <QuickLink href="/search?q=federal+budget" label="Federal Budget" />
              <QuickLink href="/search?q=congress+votes" label="Congress Votes" />
              <QuickLink href="/search?q=declassified" label="Declassified Docs" />
              <QuickLink href="/search?q=state+laws" label="State Laws" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="Unified Search"
            description="One search across Data.gov, Archives.gov, Congress.gov, and state portals"
            icon="🔍"
            color="green"
          />
          <FeatureCard
            title="Personal Vault"
            description="Save documents, add custom tags, create visual connections between data"
            icon="🗄️"
            color="blue"
          />
          <FeatureCard
            title="Visual Government"
            description="Interactive org charts showing federal & state government structure"
            icon="📊"
            color="purple"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-green-800/30 bg-black/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-2 text-xl font-bold text-white">
                E PLURIBUS UNUM
              </div>
              <p className="max-w-md text-sm text-gray-400">
                Making U.S. government data accessible, searchable, and understandable for every citizen.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Privacy</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Sources</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">Contact</a>
              <a href="#" className="text-sm text-green-600 hover:text-green-400">GitHub</a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-green-800">
            © 2024 E Pluribus Unum. An independent public service project.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
function NavLink({ href, icon, text, active = false }: { 
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

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-green-900 p-3 text-center hover:bg-green-950/30 hover:border-green-700 transition-all"
    >
      <div className="text-green-400">{label}</div>
    </Link>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  color: 'green' | 'blue' | 'purple' 
}) {
  const colors = {
    green: 'border-green-800 bg-green-950/20',
    blue: 'border-blue-800 bg-blue-950/20',
    purple: 'border-purple-800 bg-purple-950/20'
  };

  const textColors = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  };

  return (
    <div className={`rounded-xl border p-6 ${colors[color]} transition-all hover:glow`}>
      <div className="mb-4 text-3xl">{icon}</div>
      <h4 className={`mb-2 text-xl font-bold ${textColors[color]}`}>{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}