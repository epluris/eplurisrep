export default function SearchPage() {
  return (
    <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
      <div className="border border-green-800 p-4">
        <div className="mb-4">
          <span className="text-green-300">C:\SEARCH\QUERY\</span>
          <span className="blink">_</span>
        </div>
        <div className="mb-6">
          <div className="flex">
            <span className="mr-2 text-green-600">&gt;</span>
            <input
              type="text"
              placeholder="ENTER YOUR SEARCH TERMS..."
              className="flex-1 bg-black text-green-400 outline-none border border-green-900 p-2"
            />
          </div>
          <button className="mt-4 border border-green-700 bg-green-900 px-6 py-2 text-green-300">
            INITIATE SEARCH
          </button>
        </div>
        
        <div className="border-t border-green-900 pt-4">
          <div className="text-green-600">[SEARCH PARAMETERS]</div>
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div className="border border-green-900 p-2">
              <div className="text-green-300">SOURCE</div>
              <div className="mt-1 space-y-1">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-green-600" defaultChecked />
                  DATA.GOV
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-green-600" />
                  ARCHIVES.GOV
                </label>
              </div>
            </div>
            <div className="border border-green-900 p-2">
              <div className="text-green-300">TYPE</div>
              <div className="mt-1 space-y-1">
                <label className="flex items-center">
                  <input type="radio" name="type" className="mr-2 accent-green-600" defaultChecked />
                  DATASETS
                </label>
                <label className="flex items-center">
                  <input type="radio" name="type" className="mr-2 accent-green-600" />
                  DOCUMENTS
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}