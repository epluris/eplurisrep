import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-600"></div>
            <span className="text-xl font-bold dark:text-white">E Pluribus</span>
          </div>
          <div className="flex gap-6">
            <Link href="/search" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
              Search
            </Link>
            <Link href="/vault" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
              Vault
            </Link>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">
            The Public's Government
            <span className="block text-blue-600">Data Portal</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Search millions of documents, datasets, and records from U.S. federal and state governments. 
            Save, organize, and connect information in your personal Vault.
          </p>
          
          {/* Main Search Bar */}
          <div className="mx-auto mb-16 max-w-2xl">
            <div className="flex overflow-hidden rounded-xl shadow-lg">
              <input
                type="text"
                placeholder="Search laws, datasets, declassified documents..."
                className="flex-1 px-6 py-4 text-lg focus:outline-none"
              />
              <button className="bg-blue-600 px-8 font-medium text-white hover:bg-blue-700">
                Search
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Try: "2023 federal budget" or "Supreme Court cases 2024"
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900"></div>
              <h3 className="mb-3 text-xl font-semibold dark:text-white">Centralized Search</h3>
              <p className="text-gray-600 dark:text-gray-400">
                One place for all public U.S. government data from federal to state levels.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900"></div>
              <h3 className="mb-3 text-xl font-semibold dark:text-white">Personal Vault</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save documents, add custom tags, and create visual connections.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
              <div className="mb-4 h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900"></div>
              <h3 className="mb-3 text-xl font-semibold dark:text-white">Non-Partisan</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Raw data only. No commentary. Every document source-verified.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
