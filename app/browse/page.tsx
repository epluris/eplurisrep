export default function BrowsePage() {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4">
          <div className="mb-4">
            <span className="text-green-300">C:\BROWSE\CATEGORIES\</span>
            <span className="blink">_</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-900 p-3">
              <div className="text-green-300">[FEDERAL]</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="text-green-400">• LAWS & BILLS</div>
                <div className="text-green-400">• BUDGET DATA</div>
                <div className="text-green-400">• AGENCY REPORTS</div>
              </div>
            </div>
            <div className="border border-green-900 p-3">
              <div className="text-green-300">[DECLASSIFIED]</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="text-green-400">• CIA CREST</div>
                <div className="text-green-400">• FBI VAULT</div>
                <div className="text-green-400">• NSA RECORDS</div>
              </div>
            </div>
            <div className="border border-green-900 p-3">
              <div className="text-green-300">[STATE]</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="text-green-400">• CALIFORNIA</div>
                <div className="text-green-400">• TEXAS</div>
                <div className="text-green-400">• NEW YORK</div>
              </div>
            </div>
            <div className="border border-green-900 p-3">
              <div className="text-green-300">[MEDIA]</div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="text-green-400">• CONGRESS VIDS</div>
                <div className="text-green-400">• WHITE HOUSE</div>
                <div className="text-green-400">• PRESS BRIEFS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  