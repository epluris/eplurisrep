import Link from "next/link";

export default function Home() {
  return (
    <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
      {/* DOS Header */}
      <div className="mb-8 border border-green-800 p-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">C:\EPLURIBUS\</span>
          <span className="blink">_</span>
        </div>
        <div className="mt-1 text-sm text-green-600">
          E Pluribus - U.S. Government Data Terminal [Version 1.0]
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - System Status */}
        <div className="border border-green-900 p-4">
          <div className="mb-4 border-b border-green-900 pb-2">
            <span className="text-green-300">SYSTEM STATUS</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>DATA.GOV</span>
              <span className="text-green-300">● ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>ARCHIVES.GOV</span>
              <span className="text-green-300">● ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>CONGRESS.GOV</span>
              <span className="text-yellow-400">● STANDBY</span>
            </div>
            <div className="mt-4 pt-2 border-t border-green-900">
              <span className="text-green-600">Last updated: 01-05-2024 14:30:17</span>
            </div>
          </div>
        </div>

        {/* Center Column - Main Interface */}
        <div className="md:col-span-2 border border-green-800 p-4">
          <div className="mb-6">
            <div className="text-lg text-green-300">
              WELCOME TO E PLURIBUS DATA TERMINAL
            </div>
            <div className="mt-2 text-green-600">
              &gt; Non-partisan U.S. Government Data Portal
            </div>
          </div>

          {/* Command Input */}
          <div className="mb-6">
            <div className="mb-2 flex items-center">
              <span className="text-green-300">C:\SEARCH\</span>
              <span className="blink ml-1">_</span>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="ENTER SEARCH QUERY..."
                className="flex-1 bg-black p-2 font-mono text-green-400 outline-none border border-green-900"
              />
              <button className="border border-green-700 bg-green-900 px-4 py-2 text-green-300 hover:bg-green-800">
                EXECUTE
              </button>
            </div>
            <div className="mt-2 text-sm text-green-600">
              &gt; Try: &quot;FEDERAL BUDGET 2024&quot; or &quot;DECLASSIFIED 1990&quot;
            </div>
          </div>

          {/* Quick Commands */}
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/search" 
              className="border border-green-900 p-3 hover:bg-green-950"
            >
              <div className="text-green-300">[1] SEARCH</div>
              <div className="mt-1 text-sm text-green-600">Query all databases</div>
            </Link>
            <Link 
              href="/vault" 
              className="border border-green-900 p-3 hover:bg-green-950"
            >
              <div className="text-green-300">[2] VAULT</div>
              <div className="mt-1 text-sm text-green-600">Personal data storage</div>
            </Link>
            <Link 
              href="/browse" 
              className="border border-green-900 p-3 hover:bg-green-950"
            >
              <div className="text-green-300">[3] BROWSE</div>
              <div className="mt-1 text-sm text-green-600">Explore by category</div>
            </Link>
            <Link 
              href="/gov" 
              className="border border-green-900 p-3 hover:bg-green-950"
            >
              <div className="text-green-300">[4] GOV STRUCT</div>
              <div className="mt-1 text-sm text-green-600">Org chart visual</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="mt-8 border-t border-green-900 pt-4 text-sm">
        <div className="flex justify-between">
          <div>
            <span className="text-green-600">USERS ONLINE:</span>
            <span className="ml-2 text-green-300">001</span>
          </div>
          <div>
            <span className="text-green-600">DOCUMENTS INDEXED:</span>
            <span className="ml-2 text-green-300">376,697+</span>
          </div>
          <div>
            <span className="text-green-600">PRESS</span>
            <span className="mx-2 text-green-800">|</span>
            <span className="text-green-300">F1</span>
            <span className="text-green-600 ml-4">FOR HELP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
