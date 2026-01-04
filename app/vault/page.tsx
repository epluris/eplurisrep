export default function VaultPage() {
    return (
      <div className="scanlines min-h-screen bg-black p-4 font-mono text-green-400">
        <div className="border border-green-800 p-4">
          <div className="mb-4">
            <span className="text-green-300">C:\VAULT\PERSONAL\</span>
            <span className="blink">_</span>
          </div>
          
          <div className="mb-6 border border-green-900 p-3">
            <div className="text-green-600">[AUTHENTICATION REQUIRED]</div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="text-green-300">USERNAME:</div>
                <input className="mt-1 w-full bg-black p-2 border border-green-900 text-green-400" />
              </div>
              <div>
                <div className="text-green-300">PASSWORD:</div>
                <input type="password" className="mt-1 w-full bg-black p-2 border border-green-900 text-green-400" />
              </div>
              <button className="border border-green-700 bg-green-900 px-6 py-2 text-green-300 hover:bg-green-800">
                LOGIN
              </button>
            </div>
          </div>
  
          <div className="border border-green-900 p-3">
            <div className="text-green-600">[VAULT PREVIEW]</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>DOCUMENTS STORED:</span>
                <span className="text-green-300">0</span>
              </div>
              <div className="flex justify-between">
                <span>TOTAL TAGS:</span>
                <span className="text-green-300">0</span>
              </div>
              <div className="flex justify-between">
                <span>LAST ACCESS:</span>
                <span className="text-yellow-400">NEVER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  